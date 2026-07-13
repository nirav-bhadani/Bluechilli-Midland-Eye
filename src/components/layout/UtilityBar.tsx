import Link from "next/link";
import { clinic } from "@/content/global";

export function UtilityBar() {
  return (
    <div className="hidden bg-primary text-sm text-white lg:block">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-2">
        <p className="font-medium">Open 7 days a week</p>
        <div className="flex items-center gap-6">
          <a href={clinic.phoneHref} className="font-semibold text-brandlight hover:text-white">
            ☎ {clinic.phone}
          </a>
          <Link href="/refer-a-patient" className="hover:text-brandlight">
            Refer a Patient
          </Link>
          <span aria-label="Rated 5 stars on Trustpilot" className="font-medium text-brandlight">
            ★★★★★ Trustpilot
          </span>
        </div>
      </div>
    </div>
  );
}
