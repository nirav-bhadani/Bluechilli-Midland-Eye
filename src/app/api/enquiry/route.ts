import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";

/**
 * Booking-form endpoint. Currently validation-only (staging): CRM/SMTP
 * delivery is a post-approval task — see project memory "post-launch todos".
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot filled → pretend success, deliver nothing.
  if (parsed.data.company) return NextResponse.json({ ok: true });

  // TODO(go-live): forward parsed.data to CRM/SMTP.
  console.log("[enquiry]", { ...parsed.data, receivedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
