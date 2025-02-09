#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { readFiles } = require("../utils/readFiles.js");
const { addNewMessages } = require("../utils/messages.js");
const minimist = require("minimist");

function showHelp() {
  console.log(`
Add new messages to translation files

Usage: node add.js [options]

Options:
    --sourceFile, -s   Specifies the source file for new messages
    --translationsDir, -t   Specifies the directory containing the translation files to be updated
    --help, -h   Displays this help message

Example:
    node add.js -s origin.json -t target.json
`);
}

const args = minimist(process.argv.slice(2));
if (args.help || args.h) {
  showHelp();
  process.exit(0);
}

const sourceFile = args.sourceFile || args.s;
if (!sourceFile) {
  console.error("No source file provided");
  showHelp();
  process.exit(1);
}

const translationsDir = args.translationsDir || args.t;
if (!translationsDir) {
  console.error("No target file provided");
  showHelp();
  process.exit(1);
}

const sourceMessages = require(path.resolve("./", sourceFile));
const NEW_LINE_ENDING = "\n";

readFiles(translationsDir, ".json", (content, filepath, name) => {
  const translateMerged = addNewMessages(
    Object.assign({}, sourceMessages),
    JSON.parse(content || "{}")
  );

  const translated = JSON.stringify(translateMerged, null, 2);
  fs.writeFileSync(filepath, `${translated}${NEW_LINE_ENDING}`, {
    encoding: "utf-8",
  });
});
