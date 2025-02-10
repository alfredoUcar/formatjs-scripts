#!/usr/bin/env node

const minimist = require("minimist");
const args = minimist(process.argv.slice(2));
const command = args._[0]; // first argument is the command

switch (command) {
  case "add":
    require("./scripts/add.js")(args);
    break;
  default:
    console.log("Usage: formatjs-scripts <command>");
    console.log("Available commands:");
    console.log("  add   - Adds translations");
    process.exit(1);
}
