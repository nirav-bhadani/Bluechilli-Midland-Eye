import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center px-6 py-20 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-teal-dark">404</p>
        <h1 className="mt-2 text-4xl">We can&rsquo;t find that page</h1>
        <p className="mx-auto mt-4 max-w-md">
          The page may have moved. Try the homepage, or browse our treatments and consultants.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="teal">
            Go to homepage
          </ButtonLink>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border-2 border-secondary px-6 py-3 font-semibold text-teal-dark hover:bg-soft"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
