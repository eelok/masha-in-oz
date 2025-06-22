const { DateTime } = require("luxon");
const isProduction = process.env.ELEVENTY_ENV === "production";

module.exports = function (eleventyConfig) {
  // Copy assets including images
  eleventyConfig.addPassthroughCopy("src/assets");

  // Date filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // Language-specific date filter
  eleventyConfig.addFilter("localizedDate", (dateObj, locale) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" })
      .setLocale(locale)
      .toFormat("dd LLL yyyy");
  });

  // HTML Date String filter (ISO format for datetime attributes)
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    });
  });

  // Current year filter
  eleventyConfig.addFilter("currentYear", () => {
    return new Date().getFullYear();
  });

  // Limit filter (limit array to N items)
  eleventyConfig.addFilter("limit", (array, limit) => {
    if (!Array.isArray(array)) {
      return array;
    }
    return array.slice(0, limit);
  });

  // Excerpt filter for blog post previews
  eleventyConfig.addFilter("excerpt", (content, limit = 200) => {
    const text = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  });

  // Collection for each language
  eleventyConfig.addCollection("posts_en", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/en/posts/*.md").reverse();
  });

  eleventyConfig.addCollection("posts_ru", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/ru/posts/*.md").reverse();
  });

  eleventyConfig.addCollection("posts_de", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/de/posts/*.md").reverse();
  });

  // Collection for featured posts (posts with featured_image)
  eleventyConfig.addCollection("featuredPosts", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => {
        return item.data.featured_image && item.data.featured_image.length > 0;
      })
      .reverse();
  });

  // Markdown configuration
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");

  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#",
    }),
    level: [1, 2, 3, 4],
    slugify: eleventyConfig.getFilter("slug"),
  });

  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: isProduction ? "masha-in-oz" : "/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
