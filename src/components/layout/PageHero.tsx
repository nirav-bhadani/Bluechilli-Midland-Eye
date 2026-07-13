import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import { Chip } from "@/components/ui/Chip";

/**
 * Shared premium page banner (homepage hero language): navy gradient mesh,
 * aperture motif, dark breadcrumbs, eyebrow, two-colour H1, optional intro,
 * chips and a right-hand slot (e.g. a booking form).
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  intro,
  crumbs,
  chips,
  children,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  intro?: string;
  crumbs: Crumb[];
  chips?: readonly string[];
  children?: React.ReactNode;
}) {
  return (
    <section className="mesh-navy relative overflow-hidden text-white">
      <svg aria-hidden viewBox="0 0 200 200" fill="none" className="float-slow pointer-events-none absolute -right-32 top-1/2 h-[560px] w-[560px] -translate-y-1/2 opacity-[0.1]">
        <circle cx="100" cy="100" r="92" stroke="#40BADA" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="64" stroke="#40BADA" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="36" stroke="#40BADA" strokeWidth="1.2" />
      </svg>

      <div className="container relative py-10 sm:py-14 lg:py-16">
        <div className="mb-7">
          <Breadcrumbs items={crumbs} dark />
        </div>

        <div className={children ? "grid items-center gap-10 lg:grid-cols-[1.05fr_440px]" : "max-w-3xl"}>
          <div>
            {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              {title}
              {highlight && (
                <>
                  {" "}
                  <Highlight dark>{highlight}</Highlight>
                </>
              )}
            </h1>
            {intro && <p className="mt-5 max-w-xl text-lg text-white/75">{intro}</p>}
            {chips && chips.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2.5">
                {chips.map((c) => (
                  <Chip key={c} dark>
                    {c}
                  </Chip>
                ))}
              </div>
            )}
          </div>
          {children && <div className="text-body">{children}</div>}
        </div>
      </div>
    </section>
  );
}
