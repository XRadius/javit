import { try7mmtv } from "./providers/7mmtv.js";
import { tryJavDatabase } from "./providers/javdatabase.js";
import { tryJavMost } from "./providers/javmost.js";
const providers = [try7mmtv, tryJavDatabase, tryJavMost];

/** @param {string} code */
export async function searchAsync(code) {
  for (const providerAsync of providers) {
    const metadata = await providerAsync(code).catch(() => {});
    const hasMatch = metadata ? isAcceptableTitle(metadata.title) : false;
    if (hasMatch) return metadata;
  }
  return;
}

/** @param {string} title */
function isAcceptableTitle(title) {
  const expression = /[\u{4E00}-\u{9FFF}\u{3040}-\u{309F}\u{30A0}-\u{30FF}]/gu;
  const characters = title.match(expression) || [];
  return characters.length / title.length <= 0.5;
}
