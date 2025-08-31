import test from "node:test";
import { strictEqual as seq } from "node:assert";
import { try7mmtv } from "./7mmtv.js";

test("7mmtv", async () => {
  const res = await try7mmtv("MIRD-163");
  if (res) {
    seq(res.previewUrl.pathname, "/censored/b/135637_MIRD-163.jpg");
    seq(res.title, "MIRD-163 The Prince And His 10 Eternally Submissive Maids");
  } else {
    throw new Error("Not Found");
  }
});
