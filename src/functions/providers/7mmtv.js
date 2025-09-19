import * as cheerio from "cheerio";
import { Metadata } from "../Metadata.js";
import { getCode } from "../getCode.js";
import { normalizeTitle } from "./utils/normalizeTitle.js";

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
  body.append("search_type", "searchall");
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
      return videoAsync($, new URL(response.url));
    }
  }
  return undefined;
}

/**
 * @param {cheerio.CheerioAPI} $
 * @param {URL} url
 */
function videoAsync($, url) {
  const imageContent = $(".content_main_cover img").first().attr("src");
  const imageUrl = imageContent ? new URL(imageContent, url) : undefined;
  const titleContent = $(".fullvideo-title").first().text();
  const title = titleContent ? normalizeTitle(titleContent) : undefined;
  return imageUrl && title ? new Metadata(imageUrl, title, url) : undefined;
}
