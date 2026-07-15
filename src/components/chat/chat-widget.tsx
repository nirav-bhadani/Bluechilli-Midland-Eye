"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChatPanel } from "./chat-panel";
import { hydrateStore } from "./chat-store";
import { EyeMark, XIcon } from "./icons";

/**
 * Global chat launcher. Mounted once in the root layout. Renders a floating
 * pill (bottom-right) that toggles the full ChatPanel, and listens for the
 * global "openChat" window event so any CTA can open it (see open-chat.ts).
 *
 * On mobile it sits above the StickyMobileBar (h-14) via bottom-20.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  useEffect(() => {
    hydrateStore();
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const prompt = (e as CustomEvent<{ prompt?: string }>).detail?.prompt;
      if (prompt) setPendingPrompt(prompt);
      setOpen(true);
    };
    window.addEventListener("openChat", onOpen);
    return () => window.removeEventListener("openChat", onOpen);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Dimmed, blurred backdrop — puts focus on the popup */}
            <motion.div
              key="chat-backdrop"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-hidden
              className="fixed inset-0 z-[75] bg-primary/30 backdrop-blur-md"
            />
            <ChatPanel
              onClose={() => setOpen(false)}
              initialPrompt={pendingPrompt}
              onPromptConsumed={() => setPendingPrompt(null)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Floating pill launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 22 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="group fixed bottom-20 right-4 z-[90] flex items-center gap-3 rounded-full border border-line bg-white/90 py-2 pl-2 pr-4 shadow-lifted backdrop-blur-xl lg:bottom-6 lg:right-6"
      >
        <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-secondary to-primary text-white">
          {open ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <>
              <EyeMark className="h-6 w-6" fill="#ffffff" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-success" />
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-secondary/30" />
            </>
          )}
        </span>
        {!open && (
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[0.7rem] font-semibold text-body/70">Midland Eye</span>
            <span className="text-sm font-bold text-primary">Ask Me Anything</span>
          </span>
        )}
      </motion.button>
    </>
  );
}
