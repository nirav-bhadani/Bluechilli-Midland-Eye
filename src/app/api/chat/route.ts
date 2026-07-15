import { NextRequest } from "next/server";
import { z } from "zod";
import { clinic } from "@/content/global";
import { buildSystemPrompt } from "@/lib/chat-knowledge";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(30),
});

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? clinic.url;

function getIp(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "anonymous";
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please slow down." }),
      { status: 429, headers: { "content-type": "application/json" } }
    );
  }

  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "The assistant isn't configured yet. Please call us on " + clinic.phone + ".",
      }),
      { status: 503, headers: { "content-type": "application/json" } }
    );
  }

  const model = process.env.OPENROUTER_MODEL ?? "deepseek/deepseek-v4-flash";
  const fallback = process.env.OPENROUTER_FALLBACK_MODEL;

  const payload = {
    model,
    ...(fallback ? { models: [model, fallback] } : {}),
    stream: true,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      ...parsed.messages,
    ],
    temperature: 0.5,
    max_tokens: 800,
  };

  let upstream: Response;
  try {
    upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
        "HTTP-Referer": SITE_URL,
        "X-Title": clinic.name,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return new Response(
      JSON.stringify({
        error:
          "Couldn't reach the assistant service. Please check your connection and try again.",
      }),
      { status: 503, headers: { "content-type": "application/json" } }
    );
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("OpenRouter error", upstream.status, detail);
    return new Response(
      JSON.stringify({ error: "The assistant is busy right now. Please try again shortly." }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const token = json.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              // ignore keep-alive / partial frames
            }
          }
        }
        controller.close();
      } catch {
        controller.error(new Error("stream error"));
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache, no-transform",
    },
  });
}
