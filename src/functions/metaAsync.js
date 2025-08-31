import { try7mmtv } from "./providers/7mmtv.js";
import { tryBestJavPorn } from "./providers/bestjavporn.js";

/** @param {string} name */
export async function metaAsync(name) {
  const providers = [try7mmtv, tryBestJavPorn];
  for (const providerAsync of providers) {
    const result = await providerAsync(name);
    if (result && isValid(result.title)) {
      const previewUrl = result.previewUrl;
      const title = result.title;
      return { previewUrl, title };
    }
  }
  return undefined;
}

/** @param {string} title */
function isValid(title) {
  const expression = /[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]/g;
  const characters = title.match(expression) || [];
  return characters.length / title.length <= 0.5;
}
