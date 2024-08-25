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

  files.forEach((file) => {
    if (file.endsWith(".md")) {
      const markdownPath = `${SLIDES_DIR}/${file}`;
      const outputFileName = file.replace(".md", ".html");
      const slideHtmlPath = `${PUBLIC_DIR}/${outputFileName}`;
      const basenameWithoutExtension = path.parse(file).name;

      const ogImagePath = `${canonicalUrl}/${basenameWithoutExtension}.png`;
      const slideUrl = `${canonicalUrl}/${basenameWithoutExtension}.html`;

      const command = `npm run marp -- --og-image ${ogImagePath} --url ${slideUrl} ${markdownPath} -o ${slideHtmlPath}`;

      console.log(command);

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running command for ${file}:`, error);
          return;
        }

        console.log(`Command executed successfully for ${file}`);
        console.log("stdout:", stdout);
        console.error("stderr:", stderr);
      });
    }
  });
});
