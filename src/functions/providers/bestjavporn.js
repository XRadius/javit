import * as cheerio from "cheerio";

/** @param {string} name */
export async function tryBestJavPorn(name) {
  const response = await getAsync(name);
  const responseText = await response.text();
  const $ = cheerio.load(responseText);
  return await searchAsync(name, $, response.url);
}

/** @param {string} name */
async function getAsync(name) {
  const search = encodeURIComponent(name);
  const url = new URL(`https://www.bestjavporn.com/search/${search}/`);
  return await fetch(url);
}

/**
 * @param {string} name
 * @param {cheerio.CheerioAPI} $
 * @param {string} url
 */
async function searchAsync(name, $, url) {
  for (const anchor of $("#main a[href]")) {
    const anchorHref = $(anchor).attr("href");
    const anchorText = $(anchor).text();
    if (anchorHref && anchorText.includes(name)) {
      const request = new URL(anchorHref, url);
      const response = await fetch(request);
      const responseText = await response.text();
      const $ = cheerio.load(responseText);
      return videoAsync($, response.url);
    }
  }
  return;
}

/**
 * @param {cheerio.CheerioAPI} $
 * @param {string} url
 */
function videoAsync($, url) {
  const rawPreview = $('meta[itemprop="thumbnailUrl"]').first().attr("content");
  const rawTitle = $(".video-description").first().text().trim();
  if (rawPreview && rawTitle) {
    const previewUrl = new URL(rawPreview, url);
    const title = rawTitle.replace(/\[[^\]]+\]/g, "").replace(/\s+/, " ");
    return { previewUrl, title };
  } else {
    return;
  }
}
