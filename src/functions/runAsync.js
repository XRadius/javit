import * as app from "../index.js";
import * as path from "node:path";
import * as fs from "node:fs";
import { posterAsync } from "./helpers/posterAsync.js";
import sanitizeFilename from "sanitize-filename";

/**
 * @param {string} filePath
 * @param {Metadata} value
 */
export async function runAsync(filePath, value) {
  const { dir, ext } = path.parse(filePath);
  const fileName = sanitizeFilename(value.title).substring(0, 120).trim();
  const imagePath = path.join(dir, fileName);
  const videoPath = path.join(dir, `${fileName}${ext}`);
  await fileAsync(filePath, videoPath);
  await imageAsync(imagePath, value.previewUrl);
}

/**
 * @param {string} fromPath
 * @param {string} toPath
 */
async function fileAsync(fromPath, toPath) {
  if (app.isSame(fromPath, toPath)) return;
  if (await fs.promises.stat(toPath).catch(() => {})) throw new Error("Exists");
  await fs.promises.rename(fromPath, toPath);
}

/**
 * @param {string} filePath
 * @param {URL} value
 */
async function imageAsync(filePath, value) {
  const response = await fetch(value);
  const fanart = await response.arrayBuffer().then(Buffer.from);
  const poster = await posterAsync(fanart);
  await fs.promises.writeFile(`${filePath}-fanart.tmp`, fanart);
  await fs.promises.writeFile(`${filePath}.tmp`, poster);
  await fs.promises.rename(`${filePath}-fanart.tmp`, `${filePath}-fanart.jpg`);
  await fs.promises.rename(`${filePath}.tmp`, `${filePath}.jpg`);
}
