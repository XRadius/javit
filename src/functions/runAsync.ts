import * as app from '..';
import * as path from 'node:path';
import * as fs from 'node:fs';
import {DateTime} from 'luxon';
import {posterAsync} from './helpers/posterAsync';
import sanitizeFilename from 'sanitize-filename';

export async function runAsync(filePath: string, value: app.Metadata) {
  const {dir, ext} = path.parse(filePath);
  const fileName = sanitizeFilename(value.title).substring(0, 120).trim();
  const imagePath = path.join(dir, fileName);
  const videoPath = path.join(dir, `${fileName}${ext}`);
  await fileAsync(filePath, videoPath);
  await imageAsync(imagePath, value.previewUrl);
  await timeAsync(videoPath, value.releaseDate);
}

async function fileAsync(fromPath: string, toPath: string) {
  if (app.isSame(fromPath, toPath)) return;
  if (await fs.promises.stat(toPath).catch(() => {})) throw new Error('Exists');
  await fs.promises.rename(fromPath, toPath);
}

async function imageAsync(filePath: string, value: URL) {
  const response = await fetch(value);
  const fanart = await response.arrayBuffer().then(Buffer.from);
  const poster = await posterAsync(fanart);
  await fs.promises.writeFile(`${filePath}-fanart.tmp`, fanart);
  await fs.promises.writeFile(`${filePath}.tmp`, poster);
  await fs.promises.rename(`${filePath}-fanart.tmp`, `${filePath}-fanart.jpg`);
  await fs.promises.rename(`${filePath}.tmp`, `${filePath}.jpg`);
}

async function timeAsync(filePath: string, value: DateTime) {
  const time = value.toSeconds();
  await fs.promises.utimes(filePath, time, time);
}
