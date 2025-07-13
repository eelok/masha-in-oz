const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Copy assets including images
  eleventyConfig.addPassthroughCopy("src/assets");

   eleventyConfig.addWatchTarget("src/assets/css/");
   eleventyConfig.addWatchTarget("src/assets/css/**/*.css");

  eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: true,
    port: 8080
  });

  // Date filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  eleventyConfig.addShortcode("youtube", function(id, title = "") {
    return `
      <div class="video-responsive">
        <iframe 
          src="https://www.youtube.com/embed/${id}" 
          title="${title}"
          frameborder="0" 
          allowfullscreen>
        </iframe>
      </div>
    `;
  });

  eleventyConfig.addShortcode("komootembed", function(id, token, title = "") {
    return `
      <div class="komootembed-responsive">
        <iframe 
          src="https://www.komoot.com/de-de/tour/${id}/embed?share_token=${token}&profile=1" 
          title="${title}"
          height="700" 
          frameborder="0"
        >
        </iframe>
      </div>
    `;
  });

  // Шорткод для карусели
  eleventyConfig.addPairedShortcode("carousel", function(content, id = null) {
    const carouselId = id || `carousel-${Math.random().toString(36).substr(2, 9)}`;
    
    return `
      <div class="photo-carousel" data-carousel id="${carouselId}">
        <div class="carousel-track">
          ${content}
        </div>
        <button class="carousel-nav carousel-prev">‹</button>
        <button class="carousel-nav carousel-next">›</button>
        <div class="carousel-dots"></div>
      </div>
    `;
  });

  eleventyConfig.addShortcode("slide", function(src, alt = '', caption = '') {
    return `
      <div class="carousel-slide">
        <img src="${src}" alt="${alt}" loading="lazy">
        ${caption ? `<div class="carousel-caption">${caption}</div>` : ''}
      </div>
    `;
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
    return allPosts('en', collectionApi);
  });

  eleventyConfig.addCollection("posts_ru", function (collectionApi) {
    return allPosts('ru', collectionApi);
  });

  eleventyConfig.addCollection("posts_de", function (collectionApi) {
    return allPosts('de', collectionApi);
  });

  function allPosts(lang, collectionApi) {
    return collectionApi.getFilteredByGlob(`src/${lang}/posts/**/*.md`).reverse();
  }

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
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
