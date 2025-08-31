import test from "node:test";
import { strictEqual as seq } from "node:assert";
import { tryBestJavPorn } from "./bestjavporn.js";

test("bestjavporn", async () => {
  const res = await tryBestJavPorn("MIRD-163");
  if (res) {
    seq(res.previewUrl.pathname, "/digital/video/mird00163/mird00163pl.jpg");
    seq(res.title, "MIRD-163 The Prince And His 10 Eternally Submissive Maids");
  } else {
    throw new Error("Not Found");
  }
});
