const fs = require("fs");
const path = require("path");

// directory for GitHub Pages
const docsDir = path.resolve(__dirname, "..", "docs");

const descSortedLinks = fs
  .readdirSync(docsDir)
  .filter((filePath) => filePath.endsWith(".html") && filePath !== "index.html")
  .sort((a, b) => b.localeCompare(a))
  .map(
    (slideHtmlName) =>
      `<li><a href="${slideHtmlName}">${slideHtmlName}</a></li>`
  )
  .join("\n");

const content = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CoderDojo磐田 スライド一覧</title>
  </head>
  <body>
      <h1>CoderDojo磐田</h1>
      <p>スライド一覧</p>
      <nav>
          <ul>
              ${descSortedLinks}
          </ul>
      </nav>
  </body>
  </html>`;

fs.writeFileSync(path.join(docsDir, "index.html"), content);

console.log("index.html has been created with slide links.");
