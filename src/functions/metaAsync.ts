import * as app from '..';
import * as cheerio from 'cheerio';
import {DateTime} from 'luxon';

export async function metaAsync(name: string) {
  const request = create(name);
  const response = await fetch(request);
  const responseText = await response.text();
  const $ = cheerio.load(responseText);
  return run($, request);
}

function create(name: string) {
  const url = new URL('https://www.javlibrary.com/en/vl_searchbyid.php');
  url.searchParams.append('keyword', name);
  return url;
}

function run($: cheerio.CheerioAPI, baseUrl: URL) {
  const previewText = $('#video_jacket_img').attr('src');
  const releaseText = $('#video_date .text').text().trim();
  const title = $('.post-title').text().trim();
  if (previewText && releaseText && title) {
    const previewUrl = new URL(previewText, baseUrl);
    const releaseDate = DateTime.fromSQL(releaseText);
    return {previewUrl, releaseDate, title} as app.Metadata;
  } else {
    return;
  }
}
