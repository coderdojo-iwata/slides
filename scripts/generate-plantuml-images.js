const plantuml = require("node-plantuml");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "..", "plantuml");
const outputDir = path.join(__dirname, "..", "slides", "assets");

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  const markdownNames = files.filter((file) => file.endsWith(".md"));

  if (markdownNames.length === 0) {
    console.log("No markdown files found in the input directory.");
    return;
  }

  console.log(`Generating plantuml images from [${markdownNames}].`);

  Promise.all(
    markdownNames.map(
      (name) =>
        new Promise((resolve, reject) => {
          fs.readFile(path.join(inputDir, name), "utf8", (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              reject(err);
              return;
            }

            const basename = path.basename(name, path.extname(name));
            const outputName = path.join(outputDir, `${basename}.svg`);
            const writeStream = fs.createWriteStream(outputName);

            writeStream.on("finish", () => {
              console.log(`Image generated [${outputName}]`);
              resolve();
            });
            writeStream.on("error", (err) => {
              console.error("Error generating image:", err);
              reject(err);
            });

            plantuml.generate(data, { format: "svg" }).out.pipe(writeStream);
          });
        })
    )
  )
    .then(() => {
      console.log("All images generated successfully.");
    })
    .catch((err) => {
      console.error("Error generating images:", err);
    });
});
