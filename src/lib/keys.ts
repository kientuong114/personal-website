/**
 * Key material lives in src/content/keys/ as real `.asc` / `.txt` files and is
 * inlined at build time. Single source of truth for both the contact page and
 * the /keys/<file> endpoints, so rotating a key is one file drop.
 */
const raw = import.meta.glob<string>("../content/keys/*", {
  query: "?raw",
  import: "default",
  eager: true,
});

export type KeyFile = { file: string; body: string };

export const keyFiles: KeyFile[] = Object.entries(raw).map(([path, body]) => ({
  file: path.split("/").pop()!,
  body: body.trim(),
}));

export function getKeyFile(file: string): KeyFile {
  const match = keyFiles.find((k) => k.file === file);
  if (!match) {
    throw new Error(
      `src/content/keys/${file} not found (have: ${keyFiles.map((k) => k.file).join(", ")})`,
    );
  }
  return match;
}
