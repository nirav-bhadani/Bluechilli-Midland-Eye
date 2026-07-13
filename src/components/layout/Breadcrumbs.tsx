import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { clinic } from "@/content/global";

export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1280px] px-6 py-3 text-sm">
        <ol className="flex flex-wrap items-center gap-1.5">
          {trail.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>›</span>}
              {i === trail.length - 1 ? (
                <span aria-current="page" className="font-medium text-primary">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="text-teal-dark hover:underline">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${clinic.url}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}
