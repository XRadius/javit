import { strictEqual } from "node:assert";
import test from "node:test";

import { tryJavMost } from "./javmost.js";

const target = {
  code: "MIRD-163",
  imagePath: "/images/480/MIRD-163-UNCENSORED-LEAK.webp",
  title: "MIRD-163 -UNCENSORED-EDIT",
};

await test("javmost", async () => {
  const metadata = await tryJavMost(target.code);
  strictEqual(metadata?.imageUrl.pathname, target.imagePath);
  strictEqual(metadata.title, target.title);
});
