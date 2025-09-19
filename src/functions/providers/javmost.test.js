import test from "node:test";
import { strictEqual } from "node:assert";
import { tryJavMost } from "./javmost.js";

test("javmost", async () => {
  const metadata = await tryJavMost(target.name);
  strictEqual(metadata?.previewUrl.pathname, target.pathname);
  strictEqual(metadata?.title, target.title);
});

const target = {
  name: "MIRD-163",
  pathname: "/file_image/MIRD-163-UNCENSORED-LEAK.jpg",
  title: "MIRD-163 King To Live With Endless Obedient Maid 10 People",
};
