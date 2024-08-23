const { spawn } = require("node:child_process");
const path = require("path");
const fs = require("fs");

/**
 * Generates Open Graph (OG) images for each markdown file in the specified directory.
 *
 * @param {string} basename - The base name of the markdown file.
 */
const generateOgImage = (basename) => {
  console.log(`run og script for ${basename}`);

  const markdownPath = path.join(__dirname, "..", "slides", `${basename}.md`);
  const ogImagePath = path.join(
    __dirname,
    "..",
    "public",
    "og",
    `${basename}.png`
  );

  const ogImageGeneration = spawn(
    "npm",
    ["run", "marp", "--", markdownPath, "-o", ogImagePath],
    {
      stdio: "inherit",
    }
  );

  ogImageGeneration.on("error", (err) => {
    console.error("Error running script:", err);
  });

  ogImageGeneration.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

const markdownDir = path.join(__dirname, "..", "slides");

const markdownBaseNames = fs
  .readdirSync(markdownDir)
  .filter((fileName) => fileName.endsWith(".md"))
  .map((fileName) => path.basename(fileName, path.extname(fileName)));

markdownBaseNames.map(generateOgImage);
