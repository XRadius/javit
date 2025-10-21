import { strictEqual } from "node:assert";
import test from "node:test";

import { tryJavDatabase } from "./javdatabase.js";

const target = {
  code: "MIRD-163",
  imagePath: "/covers/full/mi/mird00163pl.webp",
  title: "MIRD-163 - The Prince And His 10 Eternally Submissive Maids",
};

await test("javdatabase", async () => {
  const metadata = await tryJavDatabase(target.code);
  strictEqual(metadata?.imageUrl.pathname, target.imagePath);
  strictEqual(metadata?.title, target.title);
});
