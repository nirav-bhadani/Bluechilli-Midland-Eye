import Link from "next/link";
import { clinic } from "@/content/global";

/** Bottom action bar, mobile only (home.md B3). */
export function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid h-14 grid-cols-2 lg:hidden">
      <a
        href={clinic.phoneHref}
        className="flex items-center justify-center gap-2 bg-secondary font-semibold text-white"
      >
        ☎ Call
      </a>
      <Link
        href="/contact#booking-form"
        className="flex items-center justify-center gap-2 bg-accent font-semibold text-white"
      >
        Book a Consultation
      </Link>
    </div>
  );
}
