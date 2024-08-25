/**
 * @fileoverview Generates PlantUML images using the node-plantuml library.
 * @module generate-plantuml-images
 */

const plantuml = require("node-plantuml");
const fs = require("fs");
const path = require("path");

/**
 * Generates plantuml images from markdown files.
 * @param {string} inputDir - The input directory containing markdown files.
 * @param {string} outputDir - The output directory to save the generated images.
 */
const generatePlantUMLImages = (inputDir, outputDir) => {
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
};

const PROJECT_ROOT_DIR = process.cwd();
const PLANTUML_DIR = path.join(PROJECT_ROOT_DIR, "plantuml");
const ASSETS_DIR = path.join(PROJECT_ROOT_DIR, "slides", "assets");

generatePlantUMLImages(PLANTUML_DIR, ASSETS_DIR);
