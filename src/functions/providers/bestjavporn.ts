import * as cheerio from 'cheerio';

export async function tryBestJavPorn(name: string) {
  const response = await getAsync(name);
  const responseText = await response.text();
  const $ = cheerio.load(responseText);
  return await searchAsync(name, $, response.url);
}

async function getAsync(name: string) {
  const search = encodeURIComponent(name);
  const url = new URL(`https://www.bestjavporn.com/search/${search}/`);
  return await fetch(url);
}

async function searchAsync(name: string, $: cheerio.CheerioAPI, url: string) {
  for (const anchor of $('#main a[href]')) {
    const anchorHref = $(anchor).attr('href');
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

function videoAsync($: cheerio.CheerioAPI, url: string) {
  const rawPreview = $('meta[itemprop="thumbnailUrl"]').first().attr('content');
  const rawTitle = $('.video-description').first().text().trim();
  if (rawPreview && rawTitle) {
    const previewUrl = new URL(rawPreview, url);
    const title = rawTitle.replace(/\[[^\]]+\]/g, '').replace(/\s+/, ' ');
    return {previewUrl, title};
  } else {
    return;
  }
}
