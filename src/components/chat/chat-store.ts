"use client";

import { useSyncExternalStore } from "react";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type Thread = {
  id: string;
  title: string;
  createdAt: number;
  messages: ChatMessage[];
};

type State = {
  threads: Thread[];
  activeId: string | null;
};

const STORAGE_KEY = "midlandeye-chat-threads";

let state: State = { threads: [], activeId: null };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.threads));
  } catch {
    /* ignore quota */
  }
}

export function hydrateStore() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const threads: Thread[] = raw ? JSON.parse(raw) : [];
    state = {
      threads,
      activeId: threads[0]?.id ?? null,
    };
    emit();
  } catch {
    /* ignore */
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return state;
}

const serverSnapshot: State = { threads: [], activeId: null };

export function useChatStore() {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export function createThread(): string {
  const thread: Thread = {
    id: uid(),
    title: "New chat",
    createdAt: Date.now(),
    messages: [],
  };
  state = { threads: [thread, ...state.threads], activeId: thread.id };
  persist();
  emit();
  return thread.id;
}

export function setActiveThread(id: string) {
  state = { ...state, activeId: id };
  emit();
}

export function ensureActiveThread(): string {
  if (state.activeId) return state.activeId;
  return createThread();
}

export function addMessage(threadId: string, message: ChatMessage) {
  state = {
    ...state,
    threads: state.threads.map((t) =>
      t.id === threadId
        ? {
            ...t,
            title:
              t.messages.length === 0 && message.role === "user"
                ? message.content.slice(0, 42)
                : t.title,
            messages: [...t.messages, message],
          }
        : t
    ),
  };
  persist();
  emit();
}

export function updateMessage(threadId: string, messageId: string, content: string) {
  state = {
    ...state,
    threads: state.threads.map((t) =>
      t.id === threadId
        ? {
            ...t,
            messages: t.messages.map((m) =>
              m.id === messageId ? { ...m, content } : m
            ),
          }
        : t
    ),
  };
  emit();
}

export function commitThread() {
  persist();
}

export { uid };
