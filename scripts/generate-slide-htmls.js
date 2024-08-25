const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const PROJECT_ROOT_DIR = process.cwd();
const SLIDES_DIR = path.join(PROJECT_ROOT_DIR, "slides");
const PUBLIC_DIR = path.join(PROJECT_ROOT_DIR, "public");
const canonicalUrl = process.env.URL || "http://localhost:8080";

fs.readdir(SLIDES_DIR, (err, files) => {
  if (err) {
    console.error("Error reading slides directory:", err);
    return;
  }

  files
    .filter((file) => file.endsWith(".md"))
    .forEach((file) => {
      const baseFileName = path.parse(file).name;
      const ogImagePath = `${canonicalUrl}/${baseFileName}.png`;
      const slideUrl = `${canonicalUrl}/${baseFileName}.html`;
      const markdownPath = path.join(SLIDES_DIR, file);
      const slideHtmlPath = path.join(PUBLIC_DIR, file.replace(".md", ".html"));

      const command = `npm run marp -- --og-image ${ogImagePath} --url ${slideUrl} ${markdownPath} -o ${slideHtmlPath}`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running command for ${file}:`, error);
          return;
        }

        console.log(`Command executed successfully for ${file}`);
        console.log("stdout:", stdout);
        console.error("stderr:", stderr);
      });
    });
});
