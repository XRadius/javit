import * as javit from "../index.js";
import { traceAsync } from "./utils/traceAsync.js";

/** @param {string} name */
export async function searchAsync(name) {
  console.log(`Fetching ${name}`);
  await traceAsync(name, checkAsync(name));
}

/** @param {string} name */
async function checkAsync(name) {
  const metadata = await javit.searchAsync(name);
  if (metadata) {
    console.log(JSON.stringify(metadata, undefined, 2));
    return true;
  } else {
    return false;
  }
}
