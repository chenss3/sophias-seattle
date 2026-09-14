import Link from "next/link";

/**
 * A soft rounded pill that navigates.
 *
 * Extracted because three real screens needed the same control: facet pills in
 * the browse filter panel, tag pills on a browse entry, and tag pills on a
 * recommendation detail page.
 *
 * Selected state is never carried by colour alone. Selected pills also gain a
 * remove glyph, and callers pass a `label` that says what activating the pill
 * will do, so the state is available to a screen reader as text.
 */
export function PillLink({
  href,
  label,
  selected = false,
  children,
}: {
  href: string;
  label: string;
  selected?: boolean;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
  const tone = selected
    ? "bg-accent font-semibold text-ink"
    : "bg-surface font-medium text-ink ring-1 ring-edge hover:bg-surface-soft";

  return (
    <Link href={href} aria-label={label} className={`${base} ${tone}`}>
      {children}
      {selected ? (
        <span aria-hidden="true" className="text-base leading-none">
          &times;
        </span>
      ) : null}
    </Link>
  );
}
