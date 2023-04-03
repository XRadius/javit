import * as app from '..';
import {traceAsync} from './helpers/traceAsync';

export async function searchAsync(name: string) {
  console.log(`Fetching ${name}`);
  await traceAsync(name, runAsync(name));
}

async function runAsync(name: string) {
  const value = await app.metaAsync(name);
  if (value) {
    console.log(JSON.stringify(value, undefined, 2));
    return true;
  } else {
    return false;
  }
}
