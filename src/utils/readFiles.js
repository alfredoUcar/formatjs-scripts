const fs = require("fs");
const path = require("path");

exports.readFiles = function readFiles(
  dir,
  extension,
  processFile,
  excludeNames = []
) {
  const fileNames = fs.readdirSync(dir);

  fileNames.forEach((filename) => {
    const name = path.parse(filename).name;
    const ext = path.parse(filename).ext;

    if (Array.isArray(excludeNames) && excludeNames.includes(name)) {
      return;
    }

    if (ext !== extension) {
      return;
    }

    const filepath = path.resolve(dir, filename);
    const content = fs.readFileSync(filepath);

    processFile(content.toString(), filepath, name);
  });
};
