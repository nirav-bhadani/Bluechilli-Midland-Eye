export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-10`}>
      {eyebrow && (
        <p
          className={`mb-2 text-sm font-medium uppercase tracking-widest ${
            dark ? "text-brandlight" : "text-teal-dark"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl sm:text-4xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && (
        <p className={`mt-4 text-lg ${dark ? "text-white/85" : "text-body"}`}>{intro}</p>
      )}
    </div>
  );
}
