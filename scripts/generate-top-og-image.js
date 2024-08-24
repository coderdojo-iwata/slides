const puppeteer = require("puppeteer");
const path = require("path");

/**
 * Generate an Open Graph image for the top page.
 */
async function generateTopOgImage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  const outputDir = path.join(__dirname, "..", "public");

  await page.goto(`file://${outputDir}/index.html`);
  await page.screenshot({
    path: path.join(outputDir, "og-image.png"),
    width: 1280,
    height: 720,
  });

  await browser.close();
  console.log("A Open Graph image ogp-image.png has been generated.");
}

generateTopOgImage()
  .catch(console.error)
  .finally(() => process.exit(0));
