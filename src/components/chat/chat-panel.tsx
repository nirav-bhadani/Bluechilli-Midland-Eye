"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { clinic } from "@/content/global";
import { ChatMessage } from "./chat-message";
import {
  ArrowUpRight,
  EyeMark,
  FileIcon,
  HistoryIcon,
  PaperclipIcon,
  PhoneIcon,
  PhotoIcon,
  PlusIcon,
  SendIcon,
  SparkleIcon,
  StopIcon,
  XIcon,
} from "./icons";
import { useChat } from "./use-chat";
import { createThread, setActiveThread, useChatStore } from "./chat-store";

const POPULAR = [
  "Book a consultation",
  "Do you offer 0% finance?",
  "Which treatments do you offer?",
  "Am I suitable for laser eye surgery?",
  "How does the free aftercare work?",
  "What are your opening times?",
];

const MOBILE_SUGGESTIONS = [
  "Book a consultation",
  "Do you offer 0% finance?",
  "Which treatments do you offer?",
  "How does aftercare work?",
];

export function ChatPanel({
  onClose,
  initialPrompt,
  onPromptConsumed,
}: {
  onClose: () => void;
  initialPrompt?: string | null;
  onPromptConsumed?: () => void;
}) {
  const [showRecent, setShowRecent] = useState(false);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { messages, send, stop, isStreaming } = useChat();
  const { threads } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const seededRef = useRef(false);

  // Seed the panel with a prompt handed in from a CTA / suggestion.
  useEffect(() => {
    if (initialPrompt && !seededRef.current) {
      seededRef.current = true;
      createThread();
      send(initialPrompt);
      onPromptConsumed?.();
    }
  }, [initialPrompt, send, onPromptConsumed]);

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
    const q = input.trim();
    if (!q && attachments.length === 0) return;

    const names = attachments.map((f) => f.name).join(", ");
    const message = names ? `${q}${q ? "\n\n" : ""}📎 Attached: ${names}` : q;

    send(message);
    setInput("");
    setAttachments([]);
  };

  const ask = (q: string) => {
    send(q);
    setShowRecent(false);
  };

  const empty = messages.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto fixed inset-2 z-[80] flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-lifted sm:inset-4 min-[1200px]:inset-6"
      role="dialog"
      aria-modal="true"
      aria-label="Midland Eye assistant"
    >
      {/* ---------- Header ---------- */}
      <div className="flex items-center justify-between gap-2 border-b border-line bg-white/80 px-4 py-3 backdrop-blur sm:px-5">
        <div className="flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-secondary to-primary text-white">
            <EyeMark className="h-6 w-6" fill="#ffffff" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-success" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-primary">Midland Eye Assistant</p>
            <p className="text-xs font-semibold text-success">Online · replies instantly</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowRecent((v) => !v)}
            aria-label="Recent chats"
            className={`flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold transition-colors sm:px-3 ${
              showRecent ? "bg-secondary text-white" : "text-body hover:bg-soft"
            }`}
          >
            <HistoryIcon className="h-4 w-4" />
            <span className="hidden min-[576px]:inline">Recent</span>
          </button>
          <button
            onClick={() => {
              createThread();
              setShowRecent(false);
            }}
            aria-label="New chat"
            className="flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold text-body transition-colors hover:bg-soft sm:px-3"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="hidden min-[576px]:inline">New chat</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="grid h-9 w-9 place-items-center rounded-full text-body transition-colors hover:bg-soft"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ---------- Body: conversation + sidebar ---------- */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Recent overlay */}
        {showRecent && (
          <div data-lenis-prevent className="absolute inset-0 z-20 overflow-y-auto bg-white p-4 sm:p-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-body/60">
              Recent chats
            </p>
            {threads.length === 0 ? (
              <p className="text-sm text-body/70">No conversations yet.</p>
            ) : (
              <ul className="mx-auto flex max-w-2xl flex-col gap-1.5">
                {threads.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => {
                        setActiveThread(t.id);
                        setShowRecent(false);
                      }}
                      className="w-full truncate rounded-xl border border-line bg-white px-3 py-2.5 text-left text-sm font-medium text-ink transition-colors hover:border-secondary/40"
                    >
                      {t.title || "New chat"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Conversation column */}
        <div className="flex min-w-0 flex-1 flex-col bg-soft/40">
          <div ref={scrollRef} data-lenis-prevent className="flex-1 overflow-y-auto p-4 sm:p-6">
            {empty ? (
              <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-6 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-secondary to-primary text-white shadow-lifted">
                  <EyeMark className="h-9 w-9" fill="#ffffff" />
                </span>
                <div>
                  <p className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                    <SparkleIcon className="h-3.5 w-3.5 text-accent" />
                    Midland Eye AI Assistant
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-ink">
                    How can we help today?
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-body">
                    I can help you explore treatments, check finance options and book
                    your consultation with our Solihull team.
                  </p>
                </div>
                {/* Mobile suggestions (desktop uses the sidebar) */}
                <div className="grid w-full gap-2.5 min-[560px]:grid-cols-2 min-[1024px]:hidden">
                  {MOBILE_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => ask(s)}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-4 py-3 text-left text-sm font-semibold text-body shadow-soft transition-all hover:border-secondary/40 hover:text-secondary"
                    >
                      {s}
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-body/40 transition-colors group-hover:text-secondary" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto flex max-w-2xl flex-col gap-4">
                {messages.map((m) => (
                  <ChatMessage key={m.id} message={m} />
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={submit} className="border-t border-line bg-white/80 p-3 backdrop-blur sm:p-4">
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
              <div className="mx-auto mb-2 flex max-w-2xl flex-wrap gap-2">
                {attachments.map((f, i) => (
                  <span
                    key={`${f.name}-${i}`}
                    className="flex max-w-[12rem] items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-body"
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

            <div className="mx-auto flex max-w-2xl items-end gap-2 rounded-2xl border border-line bg-soft px-3 py-1.5 transition-colors focus-within:border-secondary/50 focus-within:bg-white">
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
                  className={`grid h-9 w-9 place-items-center rounded-full text-body transition-colors hover:bg-white hover:text-secondary ${
                    menuOpen ? "bg-white text-secondary" : ""
                  }`}
                >
                  <PaperclipIcon className="h-5 w-5" />
                </button>
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                rows={1}
                placeholder="Ask about treatments, finance, appointments…"
                className="max-h-28 min-h-[2.25rem] flex-1 resize-none bg-transparent py-1.5 text-[0.95rem] text-ink placeholder:text-body/50 focus:outline-none"
              />
              {isStreaming ? (
                <button
                  type="button"
                  onClick={stop}
                  aria-label="Stop"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-secondary to-primary text-white shadow-soft transition-transform hover:scale-105 active:scale-95"
                >
                  <StopIcon className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim() && attachments.length === 0}
                  aria-label="Send"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-secondary to-primary text-white shadow-soft transition-all hover:scale-105 active:scale-95 disabled:scale-100 disabled:from-body/20 disabled:to-body/20 disabled:shadow-none"
                >
                  <SendIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="mx-auto mt-2 max-w-2xl text-center text-[0.68rem] text-body/50">
              AI assistant — for general guidance only, not medical advice. Book a
              consultation for case-specific advice.
            </p>
          </form>
        </div>

        {/* Sidebar (desktop) */}
        <aside className="mesh-navy hidden w-[340px] shrink-0 flex-col p-6 text-white min-[1024px]:flex">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <EyeMark className="h-8 w-8" fill="#ffffff" />
          </span>
          <h3 className="mt-5 text-xl font-bold text-white">How can we help today?</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            I can help you explore treatments, check finance and book your consultation
            with our Solihull team.
          </p>

          <p className="mt-7 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brandlight">
            <SparkleIcon className="h-3.5 w-3.5" />
            Popular questions
          </p>
          <div data-lenis-prevent className="mt-3 flex flex-1 flex-col gap-2 overflow-y-auto">
            {POPULAR.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:border-brandlight/40 hover:bg-white/10"
              >
                {q}
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/50 transition-colors group-hover:text-brandlight" />
              </button>
            ))}
          </div>

          <a
            href={clinic.phoneHref}
            className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5 text-white transition-colors hover:text-brandlight"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
              <PhoneIcon className="h-4 w-4 text-brandlight" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-bold">{clinic.phone}</span>
              <span className="block text-xs text-white/70">Weekdays 8am–8pm</span>
            </span>
          </a>
        </aside>
      </div>
    </motion.div>
  );
}
