const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const extractedMessagesData = {
  first: { defaultMessage: "First text" },
  second: { defaultMessage: "Second text" },
};
const currentTranslationsData = {
  first: { defaultMessage: "", sourceMessage: "First text" },
};

const expectedData = {
  first: { defaultMessage: "", sourceMessage: "First text" },
  second: { defaultMessage: "", sourceMessage: "Second text" },
};

const extractedMessagesFile = path.join(
  __dirname,
  "test-extracted-messages.json"
);

const translatedDir = path.join(__dirname, "translated");

const currentTranslationsFile = path.join(
  __dirname,
  "translated",
  "test-current-translations.json"
);

beforeEach(() => {
  // Create test files before each test
  fs.writeFileSync(
    extractedMessagesFile,
    JSON.stringify(extractedMessagesData, null, 2),
    "utf8"
  );

  if (!fs.existsSync(translatedDir)) {
    fs.mkdirSync(translatedDir);
  }
  fs.writeFileSync(
    currentTranslationsFile,
    JSON.stringify(currentTranslationsData, null, 2),
    "utf8"
  );
});

afterEach(() => {
  // Delete test files
  if (fs.existsSync(extractedMessagesFile)) {
    fs.unlinkSync(extractedMessagesFile);
  }
  const translatedDir = path.join(__dirname, "translated");
  if (fs.existsSync(translatedDir)) {
    fs.rm(translatedDir, { recursive: true }, (error) => {
      if (error) {
        console.error("Error deleting test directory:", error);
      }
    });
  }
});

test("Add new messages to translated files", () => {
  execSync(
    `node ./src/scripts/add.js -s ${extractedMessagesFile} -t ${translatedDir}`,
    { encoding: "utf8" }
  );

  // Read the modified JSON
  const modifiedData = JSON.parse(
    fs.readFileSync(currentTranslationsFile, "utf8")
  );

  // Verify that the changes are as expected
  expect(modifiedData).toEqual(expectedData);
});
