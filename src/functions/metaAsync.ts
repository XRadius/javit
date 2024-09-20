import * as app from '..';
import {try7mmtv} from './providers/7mmtv';
import {tryBestJavPorn} from './providers/bestjavporn';

export async function metaAsync(name: string) {
  const providers = [try7mmtv, tryBestJavPorn];
  for (const providerAsync of providers) {
    const result = await providerAsync(name);
    if (result && isValid(result.title)) {
      const previewUrl = result.previewUrl;
      const title = result.title;
      return {previewUrl, title} as app.Metadata;
    }
  }
  return;
}

function isValid(title: string) {
  const expression = /[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]/g;
  const characters = title.match(expression) || [];
  return characters.length / title.length <= 0.5;
}
