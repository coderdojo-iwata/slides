/**
 * @fileoverview This script generates Open Graph (OG) images for each markdown file
 * found in the "slides" directory. It utilizes the Marp CLI to convert markdown files
 * into PNG images and saves the output in the "public" directory.
 */

const { spawn } = require("node:child_process");
const path = require("path");
const fs = require("fs");

const PROJECT_ROOT_DIR = process.cwd();
const SLIDES_DIR = path.join(PROJECT_ROOT_DIR, "slides");
const PUBLIC_DIR = path.join(PROJECT_ROOT_DIR, "public");

/**
 * Returns the full path of the markdown file.
 *
 * @param {string} basename - The base name of the markdown file.
 * @returns {string} - Full path to the markdown file.
 */
const getMarkdownPath = (basename) => path.join(SLIDES_DIR, `${basename}.md`);

/**
 * Returns the full path of the output OG image file.
 *
 * @param {string} basename - The base name of the markdown file.
 * @returns {string} - Full path to the output OG image file.
 */
const getOgImagePath = (basename) => path.join(PUBLIC_DIR, `${basename}.png`);

/**
 * Generates Open Graph (OG) images for a specified markdown file.
 *
 * This function spawns a child process to run the `marp` command, generating
 * a PNG image from the specified markdown file.
 *
 * @param {string} basename - The base name of the markdown file (without extension).
 * @returns {Promise<void>} - A promise that resolves when the OG image generation is complete.
 */
const generateOgImage = async (basename) => {
  console.log(`Running OG script for: ${basename}`);

  try {
    await new Promise((resolve, reject) => {
      const ogImageGeneration = spawn(
        "npm",
        [
          "run",
          "marp",
          "--",
          getMarkdownPath(basename),
          "-o",
          getOgImagePath(basename),
        ],
        {
          stdio: "inherit",
        }
      );

      ogImageGeneration.on("error", (err) => {
        reject(
          new Error(`Error running script for ${basename}: ${err.message}`)
        );
      });

      ogImageGeneration.on("close", (code) => {
        if (code === 0) {
          console.log(`Successfully generated OG image for: ${basename}`);
          resolve();
        } else {
          reject(new Error(`Script exited with code ${code} for ${basename}`));
        }
      });
    });
  } catch (err) {
    console.error(err.message);
  }
};

/**
 * Generates OG images for all markdown files in the specified directory.
 */
const generateAllOgImages = async () => {
  const markdownBaseNames = fs
    .readdirSync(SLIDES_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => path.basename(fileName, path.extname(fileName)));

  for (const basename of markdownBaseNames) {
    await generateOgImage(basename);
  }
};

generateAllOgImages();
