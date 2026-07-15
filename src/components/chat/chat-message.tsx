"use client";

import { EyeMark, SparkleIcon } from "./icons";
import { Markdown } from "./markdown";
import type { ChatMessage as Msg } from "./chat-store";

export function ChatMessage({ message }: { message: Msg }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <span
        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
          isUser ? "bg-secondary text-white" : "bg-soft text-secondary"
        }`}
      >
        {isUser ? (
          <span className="text-xs font-bold">You</span>
        ) : (
          <EyeMark className="h-5 w-5" />
        )}
      </span>
      <div
        className={`max-w-[82%] min-w-0 overflow-hidden break-words rounded-2xl px-4 py-2.5 text-[0.95rem] shadow-soft [overflow-wrap:anywhere] ${
          isUser
            ? "rounded-tr-sm bg-secondary text-white"
            : "rounded-tl-sm border border-line bg-white text-body"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        ) : message.content ? (
          <div className="prose-chat">
            <Markdown content={message.content} />
          </div>
        ) : (
          <span className="flex items-center gap-1.5 py-1 text-body/50">
            <SparkleIcon className="h-3.5 w-3.5 animate-pulse" />
            <span className="flex gap-1">
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
