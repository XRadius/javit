import test from "node:test";
import { strictEqual } from "node:assert";
import { tryBestJavPorn } from "./bestjavporn.js";

test("bestjavporn", async () => {
  const metadata = await tryBestJavPorn(target.code);
  strictEqual(metadata?.previewUrl.pathname, target.pathname);
  strictEqual(metadata?.title, target.title);
});

const target = {
  code: "MIRD-163",
  pathname: "/digital/video/mird00163/mird00163pl.jpg",
  title: "MIRD-163 The Prince And His 10 Eternally Submissive Maids",
};
