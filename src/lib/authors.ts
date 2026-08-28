const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ESCAPES[char]!);

/**
 * Render an author list as a comma-separated string, with `me` in bold.
 *
 * Built as a single HTML string rather than in the template: interleaving
 * separators with elements in Astro's JSX leaves whitespace text nodes
 * between them, which renders as "Truong , Noemi" — and reformatting the
 * template can silently reintroduce that.
 */
export function formatAuthors(authors: readonly string[], me: string): string {
  return authors
    .map((name) =>
      name === me ? `<strong>${escapeHtml(name)}</strong>` : escapeHtml(name),
    )
    .join(", ");
}
