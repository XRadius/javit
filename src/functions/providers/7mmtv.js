import * as cheerio from "cheerio";
import { Metadata } from "../Metadata.js";

/** @param {string} name */
export async function try7mmtv(name) {
  const response = await getAsync(name);
  const responseText = await response.text();
  const $ = cheerio.load(responseText);
  return await searchAsync($, name, response.url);
}

/** @param {string} name */
async function getAsync(name) {
  const body = new FormData();
  const url = "https://7mmtv.sx/en/searchform_search/all/index.html";
  body.append("search_keyword", name);
  body.append("search_type", "censored");
  body.append("op", "search");
  return await fetch(url, { body, method: "POST" });
}

/**
 * @param {cheerio.CheerioAPI} $
 * @param {string} name
 * @param {string} url
 */
async function searchAsync($, name, url) {
  for (const anchor of $(".video-title a[href]")) {
    const anchorHref = $(anchor).attr("href");
    const anchorText = $(anchor).text();
    if (anchorHref && anchorText.includes(name)) {
      const response = await fetch(new URL(anchorHref, url));
      const responseText = await response.text();
      const $ = cheerio.load(responseText);
      return videoAsync($, response.url);
    }
  }
  return undefined;
}

/**
 * @param {cheerio.CheerioAPI} $
 * @param {string} url
 */
function videoAsync($, url) {
  const rawPreview = $(".content_main_cover img").first().attr("src");
  const rawTitle = $(".fullvideo-title").first().text().trim();
  if (rawPreview && rawTitle) {
    const previewUrl = new URL(rawPreview, url);
    const title = rawTitle.replace(/\[[^\]]+\]/g, "").replace(/\s+/g, " ");
    return new Metadata(previewUrl, title);
  } else {
    return undefined;
  }
}
