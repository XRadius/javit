import { try7mmtv } from "./providers/7mmtv.js";
import { tryBestJavPorn } from "./providers/bestjavporn.js";

/** @param {string} name */
export async function searchAsync(name) {
  for (const providerAsync of [try7mmtv, tryBestJavPorn]) {
    const metadata = await providerAsync(name);
    const hasMatch = metadata ? isAcceptableTitle(metadata.title) : false;
    if (hasMatch) return metadata;
  }
  return undefined;
}

/** @param {string} title */
function isAcceptableTitle(title) {
  const expression = /[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]/g;
  const characters = title.match(expression) || [];
  return characters.length / title.length <= 0.5;
}
