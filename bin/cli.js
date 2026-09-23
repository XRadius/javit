#!/usr/bin/env node
import { parseArgs } from "node:util";

import { parseAsync } from "../src/actions/parseAsync.js";
import { searchAsync } from "../src/actions/searchAsync.js";

switch (process.argv[2]) {
  case "parse":
    await execParseAsync();
    break;
  case "search":
    await execSearchAsync();
    break;
  default:
    console.log("Usage: javit <parse|search>");
    break;
}

async function execParseAsync() {
  const { positionals, values } = parseArgs({
    args: process.argv.slice(3),
    options: { force: { type: "boolean" } },
    strict: false,
  });
  if (positionals.length > 0) {
    const force = Boolean(values.force);
    await parseAsync(positionals, { force });
  } else {
    console.log("Usage: javit parse [--force] <paths...>");
  }
}

async function execSearchAsync() {
  const { positionals } = parseArgs({
    args: process.argv.slice(3),
    strict: false,
  });
  if (positionals[0]) {
    await searchAsync(positionals[0]);
  } else {
    console.log("Usage: javit search <name>");
  }
}
