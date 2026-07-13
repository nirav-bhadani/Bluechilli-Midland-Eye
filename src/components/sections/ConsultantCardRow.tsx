import Image from "next/image";
import Link from "next/link";
import { consultants } from "@/content/consultants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Consultant cards linking to profile anchors (home.md B5).
 * `filterIds` narrows to page-relevant specialists; default shows all.
 */
export function ConsultantCardRow({
  filterIds,
  title = "World-Class Surgeons and Practitioners",
  intro,
}: {
  filterIds?: string[];
  title?: string;
  intro?: string;
}) {
  const list = filterIds
    ? consultants.filter((c) => filterIds.includes(c.id))
    : consultants;
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading title={title} intro={intro} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((c) => (
            <li key={c.id} className="group rounded-card border border-line bg-white p-4 shadow-soft">
              <Link href={`/consultants-and-specialist-page#${c.id}`} className="block">
                {c.image && (
                  <div className="relative mx-auto aspect-square w-36 overflow-hidden rounded-full ring-2 ring-line group-hover:ring-brandlight">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="144px"
                      className="object-cover object-top"
                    />
                  </div>
                )}
                <h3 className="mt-4 text-center text-lg font-semibold text-primary group-hover:text-teal-dark">
                  {c.name}
                </h3>
                <p className="mt-0.5 text-center text-sm">{c.title}</p>
                {c.specialisms.length > 0 && (
                  <p className="mt-2 text-center text-sm font-medium text-teal-dark">
                    {c.specialisms.slice(0, 2).join(" · ")}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink href="/consultants-and-specialist-page" variant="outline">
            View All Consultants
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
