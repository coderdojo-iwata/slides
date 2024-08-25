/**
 * @fileoverview Generates a top OG image using Puppeteer.
 */

const puppeteer = require("puppeteer");
const path = require("path");

const PROJECT_ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(PROJECT_ROOT_DIR, "public");
const TOP_OG_IMAGE_PATH = path.join(PUBLIC_DIR, "og-image.png");

/**
 * Generate an Open Graph image for the top page.
 */
const generateTopOgImage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  await page.goto(`file://${PUBLIC_DIR}/index.html`);
  await page.screenshot({
    path: TOP_OG_IMAGE_PATH,
    width: 1280,
    height: 720,
  });

  await browser.close();
  console.log("A Open Graph image ogp-image.png has been generated.");
};

generateTopOgImage()
  .catch(console.error)
  .finally(() => process.exit(0));
