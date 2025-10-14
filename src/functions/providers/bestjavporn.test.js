import { strictEqual } from "node:assert";
import test from "node:test";

import { tryBestJavPorn } from "./bestjavporn.js";

const target = {
  code: "MIRD-163",
  imagePath: "/digital/video/mird00163/mird00163pl.jpg",
  title: "MIRD-163 The Prince And His 10 Eternally Submissive Maids",
};

await test("bestjavporn", async () => {
  const metadata = await tryBestJavPorn(target.code);
  strictEqual(metadata?.imageUrl.pathname, target.imagePath);
  strictEqual(metadata?.title, target.title);
});
