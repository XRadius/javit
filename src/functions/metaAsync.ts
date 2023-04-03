import * as app from '..';
import * as cheerio from 'cheerio';
import {DateTime} from 'luxon';

export async function metaAsync(name: string) {
  const request = create(name);
  const response = await fetch(request);
  const responseText = await response.text();
  const $ = cheerio.load(responseText);
  return app.isSame(request.toString(), response.url)
    ? listAsync(name, $, response.url)
    : run($, response.url);
}

function create(name: string) {
  const url = new URL('https://www.javlibrary.com/en/vl_searchbyid.php');
  url.searchParams.append('keyword', name);
  return url;
}

async function listAsync(name: string, $: cheerio.CheerioAPI, url: string) {
  for (const anchor of $('.videothumblist a[href]')) {
    const anchorHref = $(anchor).attr('href');
    const anchorText = $(anchor).text();
    if (anchorHref && anchorText.includes(name)) {
      const request = new URL(anchorHref, url);
      const response = await fetch(request);
      const responseText = await response.text();
      const $ = cheerio.load(responseText);
      return run($, response.url);
    }
  }
  return;
}

function run($: cheerio.CheerioAPI, url: string) {
  const previewText = $('#video_jacket_img').attr('src');
  const releaseText = $('#video_date .text').text().trim();
  const title = $('.post-title').text().trim();
  if (previewText && releaseText && title) {
    const previewUrl = new URL(previewText, url);
    const releaseDate = DateTime.fromSQL(releaseText);
    return {previewUrl, releaseDate, title} as app.Metadata;
  } else {
    return;
  }
}
