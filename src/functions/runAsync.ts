import * as app from '..';
import * as path from 'node:path';
import * as fs from 'node:fs';
import {DateTime} from 'luxon';
import sanitizeFilename from 'sanitize-filename';

export async function runAsync(filePath: string, value: app.Metadata) {
  const {dir, ext} = path.parse(filePath);
  const fileName = sanitizeFilename(value.title).substring(0, 245).trim();
  const imagePath = path.join(dir, `${fileName}.jpg`);
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
  const result = await response.arrayBuffer();
  await fs.promises.writeFile(`${filePath}.tmp`, Buffer.from(result));
  await fs.promises.rename(`${filePath}.tmp`, filePath);
}

async function timeAsync(filePath: string, value: DateTime) {
  const time = value.toSeconds();
  await fs.promises.utimes(filePath, time, time);
}
