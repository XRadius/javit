import * as javit from "../index.js";

/** @param {string} name */
export async function searchAsync(name) {
  const metadata = await javit.searchAsync(name);
  const result = JSON.stringify(metadata, undefined, 2);
  console.log(result);
}
