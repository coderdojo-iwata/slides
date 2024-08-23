const canonicalUrl = process.env.URL || undefined;

/** @type {import('@marp-team/marp-cli').Config} */
const config = {
  allowLocalFiles: true,
  themeSet: "themes",
  url: canonicalUrl,
  html: true,
};

export default config;
