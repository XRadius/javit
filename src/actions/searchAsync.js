import * as app from "../index.js";
import { traceAsync } from "./helpers/traceAsync.js";

/** @param {string} name */
export async function searchAsync(name) {
  console.log(`Fetching ${name}`);
  await traceAsync(name, runAsync(name));
}

/** @param {string} name */
async function runAsync(name) {
  const value = await app.metaAsync(name);
  if (value) {
    console.log(JSON.stringify(value, undefined, 2));
    return true;
  } else {
    return false;
  }
}
