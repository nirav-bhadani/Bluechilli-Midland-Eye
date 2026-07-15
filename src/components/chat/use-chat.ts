"use client";

import { useCallback, useRef, useState } from "react";
import {
  addMessage,
  commitThread,
  ensureActiveThread,
  updateMessage,
  uid,
  useChatStore,
  type ChatMessage,
} from "./chat-store";

export function useChat() {
  const { threads, activeId } = useChatStore();
  const [isStreaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const activeThread = threads.find((t) => t.id === activeId) ?? null;
  const messages = activeThread?.messages ?? [];

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || isStreaming) return;
      setError(null);

      const threadId = ensureActiveThread();
      const current = threads.find((t) => t.id === threadId)?.messages ?? [];

      // history sent to the API: prior turns + this user message
      const history = [...current, { role: "user" as const, content }].map(
        ({ role, content }) => ({ role, content })
      );

      addMessage(threadId, { id: uid(), role: "user", content });
      const assistantId = uid();
      addMessage(threadId, { id: assistantId, role: "assistant", content: "" });

      setStreaming(true);
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? "Something went wrong. Please try again.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          updateMessage(threadId, assistantId, acc);
        }
        commitThread();
      } catch (e) {
        const err = e as Error;
        if (err.name === "AbortError") {
          commitThread();
        } else {
          const msg = err.message || "Something went wrong.";
          setError(msg);
          updateMessage(threadId, assistantId, `⚠️ ${msg}`);
          commitThread();
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [isStreaming, threads]
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return {
    messages: messages as ChatMessage[],
    send,
    stop,
    isStreaming,
    error,
    activeThread,
  };
}
