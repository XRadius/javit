import * as cheerio from "cheerio";
import { Metadata } from "../Metadata.js";
import { getCode } from "../getCode.js";

/** @param {string} code */
export async function try7mmtv(code) {
  const response = await getAsync(code);
  const responseText = await response.text();
  const $ = cheerio.load(responseText);
  return await searchAsync($, code, response.url);
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
 * @param {string} code
 * @param {string} url
 */
async function searchAsync($, code, url) {
  for (const anchor of $(".video-title a[href]")) {
    const anchorHref = $(anchor).attr("href");
    const anchorText = $(anchor).text();
    if (anchorHref && getCode(anchorText) === code) {
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
