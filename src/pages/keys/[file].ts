import type { APIRoute, GetStaticPaths } from "astro";
import { keyFiles, getKeyFile } from "../../lib/keys";

export const getStaticPaths: GetStaticPaths = () =>
  keyFiles.map(({ file }) => ({ params: { file } }));

export const GET: APIRoute = ({ params }) => {
  const { body } = getKeyFile(params.file!);
  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
