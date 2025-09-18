#!/usr/bin/env node
import * as commander from "commander";
import { parseAsync } from "../src/actions/parseAsync.js";
import { searchAsync } from "../src/actions/searchAsync.js";

new commander.Command("javit")
  .addCommand(createParse())
  .addCommand(createSearch())
  .parse();

function createParse() {
  return new commander.Command("parse")
    .arguments("<paths...>")
    .description("Parses metadata")
    .option("--force", "Forces metadata refresh")
    .action(parseAsync);
}

function createSearch() {
  return new commander.Command("search")
    .arguments("<name>")
    .description("Search metadata")
    .action(searchAsync);
}
