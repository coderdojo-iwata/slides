const { exec } = require("child_process");
const path = require("path");

const topPath = path.join(__dirname, "..", "public", "index.html");

const command =
  process.platform === "win32"
    ? `start "" "${topPath}"` // Windows
    : process.platform === "darwin"
    ? `open "${topPath}"` // macOS
    : `xdg-open "${topPath}"`; // Linux

exec(command, (err) => {
  if (err) {
    console.error("Failed to open file:", err);
  } else {
    console.log("File opened successfully.");
  }
});
