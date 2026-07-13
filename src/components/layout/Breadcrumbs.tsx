import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { clinic } from "@/content/global";

export interface Crumb {
  label: string;
  href: string;
}

/** Breadcrumb trail + BreadcrumbList schema. Container-less: wrap in a parent. */
export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const linkCls = dark ? "text-white/70 hover:text-white" : "text-teal-dark hover:underline";
  const currentCls = dark ? "text-white" : "text-primary";
  const sepCls = dark ? "text-white/40" : "text-body/40";
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5">
          {trail.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden className={sepCls}>
                  ›
                </span>
              )}
              {i === trail.length - 1 ? (
                <span aria-current="page" className={`font-medium ${currentCls}`}>
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className={`transition-colors ${linkCls}`}>
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
