import * as cheerio from "cheerio";
import { Metadata } from "../Metadata.js";
import { getCode } from "../getCode.js";
import { normalizeTitle } from "./utils/normalizeTitle.js";

/** @param {string} code */
export async function tryBestJavPorn(code) {
  const response = await getAsync(code);
  const responseText = await response.text();
  const $ = cheerio.load(responseText);
  return await searchAsync($, code, response.url);
}

/** @param {string} name */
async function getAsync(name) {
  const search = encodeURIComponent(name);
  const url = new URL(`https://www.bestjavporn.com/search/${search}/`);
  return await fetch(url);
}

/**
 * @param {cheerio.CheerioAPI} $
 * @param {string} code
 * @param {string} url
 */
async function searchAsync($, code, url) {
  for (const anchor of $("#main a[href]")) {
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
  const src = $('meta[itemprop="thumbnailUrl"]').first().attr("content");
  const title = normalizeTitle($(".video-description").first().text());
  return src && title ? new Metadata(new URL(src, url), title) : undefined;
}
