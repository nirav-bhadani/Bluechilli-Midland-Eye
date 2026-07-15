"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChatMessage } from "./chat-message";
import { createThread } from "./chat-store";
import {
  ArrowUpRight,
  ClockIcon,
  CreditCardIcon,
  EyeMark,
  EyeScanIcon,
  FileIcon,
  PaperclipIcon,
  PhotoIcon,
  PlusIcon,
  SendIcon,
  ShieldIcon,
  SparkleIcon,
  StopIcon,
  XIcon,
} from "./icons";
import type { ComponentType } from "react";
import { useChat } from "./use-chat";

type Suggestion = { text: string; Icon: ComponentType<{ className?: string }> };

const SUGGESTIONS: Suggestion[] = [
  { text: "Am I suitable for laser eye surgery?", Icon: EyeScanIcon },
  { text: "Do you offer 0% finance?", Icon: CreditCardIcon },
  { text: "How does the free aftercare work?", Icon: ShieldIcon },
  { text: "What are your opening times?", Icon: ClockIcon },
];

/**
 * Inline hero AI assistant card. Uses the same chat engine as the floating
 * panel (shared store/thread), but renders the conversation right here in the
 * hero instead of a popup.
 */
export function HeroChat() {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { messages, send, stop, isStreaming } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const empty = messages.length === 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Close the attach menu on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const addFiles = (list: FileList | null) => {
    if (!list?.length) return;
    // Snapshot the files now — the input's live FileList is emptied by the
    // `value = ""` reset in onChange before a deferred state updater would run.
    const picked = Array.from(list);
    setAttachments((prev) => [...prev, ...picked]);
  };

  const removeAttachment = (index: number) =>
    setAttachments((prev) => prev.filter((_, i) => i !== index));

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = value.trim();
    if (!q && attachments.length === 0) return;

    const names = attachments.map((f) => f.name).join(", ");
    const message = names
      ? `${q}${q ? "\n\n" : ""}📎 Attached: ${names}`
      : q;

    send(message);
    setValue("");
    setAttachments([]);
  };

  return (
    <div className="flex max-h-[70vh] min-h-[420px] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-lifted">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-secondary to-primary text-white">
          <EyeMark className="h-6 w-6" fill="#ffffff" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-success" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="text-[0.95rem] font-bold text-primary">Midland Eye AI Assistant</p>
          <p className="truncate text-xs text-body/60">Ask me anything about your care</p>
        </div>
        {!empty && (
          <button
            onClick={() => {
              createThread();
              setValue("");
            }}
            className="ml-auto flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-bold text-body transition-colors hover:bg-soft"
          >
            <PlusIcon className="h-4 w-4 shrink-0" />
            New chat
          </button>
        )}
      </div>

      {/* Body: welcome + suggestions OR inline conversation */}
      {empty ? (
        <div className="flex-1 overflow-y-auto px-5 pb-4 pt-6" data-lenis-prevent>
          <div className="flex flex-col items-center text-center">
            <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-secondary to-primary text-white shadow-lifted">
              <span className="absolute -inset-2 -z-10 rounded-[1.4rem] bg-gradient-to-br from-secondary/25 to-primary/25 blur-xl" />
              <EyeMark className="h-8 w-8" fill="#ffffff" />
            </span>
            <p className="mt-4 flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-secondary">
              <SparkleIcon className="h-3.5 w-3.5 text-accent" />
              Midland Eye AI
            </p>
            <h3 className="mt-2 text-2xl font-bold text-ink">Ask anything about your care</h3>
            <p className="mt-1.5 max-w-xs text-[0.82rem] leading-relaxed text-body/60">
              Instant answers on treatments, pricing and appointments — pick a topic below or
              type your own.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {SUGGESTIONS.map(({ text, Icon }) => (
              <motion.button
                key={text}
                onClick={() => send(text)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-line bg-white px-4 py-3.5 text-left transition-all hover:border-secondary/40 hover:shadow-soft"
              >
                <span className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:from-secondary/[0.06] group-hover:to-primary/[0.04] group-hover:opacity-100" />
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 text-secondary transition-colors group-hover:from-secondary group-hover:to-primary group-hover:text-white">
                  <Icon className="h-[1.15rem] w-[1.15rem]" />
                </span>
                <span className="flex-1 text-[0.82rem] font-semibold leading-snug text-body group-hover:text-secondary">
                  {text}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-body/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-secondary" />
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div ref={scrollRef} data-lenis-prevent className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
        </div>
      )}

      {/* Composer */}
      <form onSubmit={submit} className="border-t border-line px-5 pb-4 pt-3">
        {/* Hidden native pickers */}
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {/* Selected attachments */}
        {attachments.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {attachments.map((f, i) => (
              <span
                key={`${f.name}-${i}`}
                className="flex max-w-[12rem] items-center gap-1.5 rounded-full border border-line bg-soft px-3 py-1 text-xs font-medium text-body"
              >
                {f.type.startsWith("image/") ? (
                  <PhotoIcon className="h-3.5 w-3.5 shrink-0 text-secondary" />
                ) : (
                  <FileIcon className="h-3.5 w-3.5 shrink-0 text-secondary" />
                )}
                <span className="truncate">{f.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(i)}
                  aria-label={`Remove ${f.name}`}
                  className="shrink-0 text-body/50 hover:text-ink"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2 rounded-2xl border border-line bg-white px-3 py-2 transition-colors focus-within:border-secondary/50">
          {/* Attach (paperclip) with popover menu */}
          <div ref={menuRef} className="relative shrink-0">
            {menuOpen && (
              <div className="absolute bottom-full left-0 z-20 mb-2 w-44 overflow-hidden rounded-2xl border border-line bg-white p-1 shadow-lifted">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    photoInputRef.current?.click();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium text-ink transition-colors hover:bg-soft"
                >
                  <PhotoIcon className="h-4 w-4 text-secondary" />
                  Add photos
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    fileInputRef.current?.click();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium text-ink transition-colors hover:bg-soft"
                >
                  <FileIcon className="h-4 w-4 text-secondary" />
                  Add files
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Add photos or files"
              aria-expanded={menuOpen}
              className={`grid h-9 w-9 place-items-center rounded-full text-body transition-colors hover:bg-soft hover:text-secondary ${
                menuOpen ? "bg-soft text-secondary" : ""
              }`}
            >
              <PaperclipIcon className="h-5 w-5" />
            </button>
          </div>

          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={1}
            placeholder="Type your question…"
            aria-label="Ask the Midland Eye assistant"
            className="max-h-24 min-h-[2.25rem] min-w-0 flex-1 resize-none bg-transparent py-1.5 text-[0.95rem] text-ink placeholder:text-body/50 focus:outline-none"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={stop}
              aria-label="Stop"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-secondary to-primary text-white shadow-soft transition-transform hover:scale-105 active:scale-95"
            >
              <StopIcon className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!value.trim() && attachments.length === 0}
              aria-label="Send"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-secondary to-primary text-white shadow-soft transition-all hover:scale-105 active:scale-95 disabled:scale-100 disabled:from-body/20 disabled:to-body/20 disabled:shadow-none"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="mt-2 text-center text-[0.68rem] leading-relaxed text-body/50">
          AI assistant — general guidance only, not medical advice. Please don&rsquo;t share
          sensitive details.
        </p>
      </form>
    </div>
  );
}
