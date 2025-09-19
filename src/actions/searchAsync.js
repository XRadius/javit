import * as javit from "../index.js";

/** @param {string} name */
export async function searchAsync(name) {
  const code = javit.getCode(name);
  const metadata = code ? await javit.searchAsync(code) : undefined;
  console.log(JSON.stringify(metadata, undefined, 2));
}
