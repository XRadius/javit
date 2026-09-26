import { strictEqual } from "node:assert";
import test from "node:test";

import { try7mmtv } from "./7mmtv.js";

const target = {
  code: "MIRD-163",
  imagePath: "/censored/b/135637_MIRD-163.jpg",
  title: "MIRD-163 A king who lives with ten infinitely obedient maids",
};

await test("7mmtv", async () => {
  const metadata = await try7mmtv(target.code);
  strictEqual(metadata?.imageUrl.pathname, target.imagePath);
  strictEqual(metadata.title, target.title);
});
