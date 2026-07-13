/** Verbatim content blocks extracted from the live site (see scripts/extract-content.mjs). */

export type Block =
  | { t: "h1" | "h2" | "h3" | "h4" | "h5"; text: string }
  | { t: "p"; html: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "table"; html: string }
  | { t: "img"; src: string; alt: string }
  | { t: "cta"; text: string; href: string }
  | { t: "accordion"; items: { q: string; a: string }[] };

export interface PageMeta {
  /** Exact document title to render (page.tsx uses title.absolute). */
  metaTitle: string;
  metaDescription: string;
  /** Live URL path, unchanged from the current site. */
  path: string;
}

export interface PageContent {
  slug: string;
  meta: PageMeta;
  /** Verbatim main-content blocks in live-page order. */
  blocks: Block[];
}

export interface TreatmentContent extends PageContent {
  kind: "treatment";
}

export interface LegalPageContent extends PageContent {
  kind: "legal";
  lastModified?: string;
}

export interface PostContent extends PageContent {
  kind: "post";
  title: string;
  published: string;
  modified?: string;
  categories: string[];
  excerpt?: string;
  image?: string;
}

export interface Consultant {
  /** Anchor id on the consultants page, e.g. "sunil-shah". */
  id: string;
  name: string;
  title: string;
  image?: string;
  specialisms: string[];
  /** Everything from the live profile, verbatim, in order. */
  blocks: Block[];
}
