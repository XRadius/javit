import * as cheerio from "cheerio";
import { Metadata } from "../Metadata.js";
import { getCode } from "../getCode.js";
import { normalizeTitle } from "./utils/normalizeTitle.js";

/** @param {string} code */
export async function tryJavMost(code) {
  const response = await getAsync(code);
  const responseText = await response.text();
  const $ = cheerio.load(responseText);
  return await searchAsync($, code, response.url);
}

/** @param {string} name */
async function getAsync(name) {
  const search = encodeURIComponent(name);
  const url = new URL(`https://www.javmost.com/search/${search}/`);
  return await fetch(url);
}

/**
 * @param {cheerio.CheerioAPI} $
 * @param {string} code
 * @param {string} url
 */
async function searchAsync($, code, url) {
  for (const anchor of $("#content a[href]:has(+ a:has(h2))")) {
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
  const imageContent = $('meta[property="og:image"]').first().attr("content");
  const image = imageContent ? new URL(imageContent, url) : undefined;
  const titleContent = $("h2.card-title").first().text();
  const title = titleContent ? normalizeTitle(titleContent) : undefined;
  return image && title ? new Metadata(image, title) : undefined;
}
