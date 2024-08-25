/**
 * @fileoverview Script to open the topPath file in the default browser.
 */

const { exec } = require("child_process");
const path = require("path");

const PROJECT_ROOT_DIR = process.cwd();
const TOP_PAGE_PATH = path.resolve(PROJECT_ROOT_DIR, "public", "index.html");

/**
 * Open the file in the default browser.
 * @param {*} filePath
 */
const openFileInBrowser = (filePath) => {
  let command;
  switch (process.platform) {
    case "win32": // Windows
      command = `start "" "${filePath}"`;
      break;
    case "darwin": // macOS
      command = `open "${filePath}"`;
      break;
    default:
      command = `xdg-open "${filePath}"`;
  }

  exec(command, (err) => {
    if (err) {
      console.error("Failed to open file:", err);
    } else {
      console.log("File opened successfully.");
    }
  });
};

openFileInBrowser(TOP_PAGE_PATH);
