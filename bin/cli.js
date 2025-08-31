#!/usr/bin/env node
import * as app from "../src/index.js";
import * as commander from "commander";

new commander.Command("javit")
  .addCommand(createParse())
  .addCommand(createSearch())
  .parse();

function createParse() {
  return new commander.Command("parse")
    .arguments("<path...>")
    .description("Parse metadata")
    .option("--force", "Determines whether to force a refresh")
    .action(app.actions.parseAsync);
}

function createSearch() {
  return new commander.Command("search")
    .arguments("<name>")
    .description("Search metadata")
    .action(app.actions.searchAsync);
}
