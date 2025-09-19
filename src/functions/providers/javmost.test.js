import test from "node:test";
import { strictEqual } from "node:assert";
import { tryJavMost } from "./javmost.js";

test("javmost", async () => {
  const metadata = await tryJavMost(target.code);
  strictEqual(metadata?.imageUrl.pathname, target.imagePath);
  strictEqual(metadata?.title, target.title);
});

const target = {
  code: "MIRD-163",
  imagePath: "/file_image/MIRD-163-UNCENSORED-LEAK.jpg",
  title: "MIRD-163 King To Live With Endless Obedient Maid 10 People",
};
