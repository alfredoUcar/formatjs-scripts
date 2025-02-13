const fs = require("fs");
const path = require("path");
const addNewMessages = require("../../src/scripts/add");

const fixturesDir = path.join(__dirname, "fixtures");
const extractedMessagesFile = path.join(fixturesDir, "extracted", "en.json");
const currentTranslationsFile = path.join(fixturesDir, "translated", "es.json");

const expectedData = {
  first: { defaultMessage: "", sourceMessage: "First text" },
  second: { defaultMessage: "", sourceMessage: "Second text" },
};

function ensureFixturesExist() {
  if (!fs.existsSync(fixturesDir)) {
    throw new Error("Fixtures directory does not exist");
  }
}

function readJSONFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

beforeEach(() => {
  ensureFixturesExist();

  // Create a backup of the original translated files
  const originalTranslationsDir = path.join(fixturesDir, "translated(backup)");
  if (!fs.existsSync(originalTranslationsDir)) {
    fs.mkdirSync(originalTranslationsDir);
  }
  fs.readdirSync(path.join(fixturesDir, "translated")).forEach((file) => {
    fs.copyFileSync(
      path.join(fixturesDir, "translated", file),
      path.join(originalTranslationsDir, file)
    );
  });
});

afterEach(() => {
  // Restore the original translated files
  const originalTranslationsDir = path.join(fixturesDir, "translated(backup)");
  fs.readdirSync(originalTranslationsDir).forEach((file) => {
    fs.copyFileSync(
      path.join(originalTranslationsDir, file),
      path.join(fixturesDir, "translated", file)
    );
  });
  fs.rmdirSync(path.join(fixturesDir, "translated(backup)"), {
    recursive: true,
  });
});

test("Add new messages to translated files", () => {
  addNewMessages({
    sourceFile: extractedMessagesFile,
    translationsDir: path.join(fixturesDir, "translated"),
  });

  const modifiedData = readJSONFile(currentTranslationsFile);

  expect(modifiedData).toEqual(expectedData);
});
