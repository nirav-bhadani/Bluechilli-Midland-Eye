"use client";

import { useState, type ReactNode } from "react";
import { HeroChat } from "./chat-hero";
import { EyeMark } from "./icons";

/**
 * Hero right-column card with a segmented switcher:
 *   • "Book a consultation" — the existing multi-step BookingForm (default)
 *   • "Ask our AI"          — the inline HeroChat assistant
 *
 * The booking form is passed in from the (server) page so its own logic is
 * untouched; this wrapper only toggles which card is shown.
 */
export function HeroAssistant({ bookingForm }: { bookingForm: ReactNode }) {
  const [tab, setTab] = useState<"book" | "ask">("ask");

  const tabCls = (active: boolean) =>
    `flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
      active ? "bg-white text-primary shadow-soft" : "text-white/80 hover:text-white"
    }`;

  return (
    <div>
      {/* Segmented control (sits on the navy hero) */}
      <div
        role="tablist"
        aria-label="Booking or assistant"
        className="mb-4 flex gap-1 rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur"
      >
        <button
          role="tab"
          aria-selected={tab === "ask"}
          onClick={() => setTab("ask")}
          className={tabCls(tab === "ask")}
        >
          <EyeMark className="h-4 w-4" />
          Ask our AI
        </button>
        <button
          role="tab"
          aria-selected={tab === "book"}
          onClick={() => setTab("book")}
          className={tabCls(tab === "book")}
        >
          Book a consultation
        </button>
      </div>

      {tab === "book" ? bookingForm : <HeroChat />}
    </div>
  );
}
