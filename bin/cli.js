#!/usr/bin/env node
import { Options } from "../src/actions/Options.js";
import { parseAsync } from "../src/actions/parseAsync.js";

const args = process.argv.slice(2);
const options = new Options();
const paths = [];

for (let index = 0; index < args.length; index++) {
  const parameter = args[index] || "";

  switch (parameter) {
    case "--force":
      options.force = true;
      break;
    default:
      paths.push(parameter);
      break;
  }
}

if (paths.length) {
  await parseAsync(paths, options);
} else {
  const descriptors = "[--force]";
  console.log(`Usage: javit ${descriptors} <paths...>`);
  process.exit(1);
}
