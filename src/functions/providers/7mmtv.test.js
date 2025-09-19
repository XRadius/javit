import test from "node:test";
import { strictEqual } from "node:assert";
import { try7mmtv } from "./7mmtv.js";

test("7mmtv", async () => {
  const metadata = await try7mmtv(target.code);
  strictEqual(metadata?.imageUrl.pathname, target.imagePath);
  strictEqual(metadata?.title, target.title);
});

const target = {
  code: "MIRD-163",
  imagePath: "/censored/b/135637_MIRD-163.jpg",
  title: "MIRD-163 The Prince And His 10 Eternally Submissive Maids",
};
