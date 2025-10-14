import fs from "node:fs";
import path from "node:path";
import sanitizeFilename from "sanitize-filename";

import { getCode } from "./getCode.js";
import { searchAsync } from "./searchAsync.js";
import { getPosterAsync } from "./utils/getPosterAsync.js";

/** @param {string} filePath */
export async function parseAsync(filePath) {
  const { dir, ext, name } = path.parse(filePath);
  const code = getCode(name);
  const metadata = code ? await searchAsync(code) : undefined;
  if (metadata) {
    const newName = sanitizeFilename(metadata.title).slice(0, 120).trim();
    const newPath = path.join(dir, newName + ext);
    if (await renameAsync(filePath, newPath)) {
      await downloadAsync(dir, metadata.imageUrl, newName);
      return "OK";
    } else {
      return "Duplicate";
    }
  } else {
    return "Not Found";
  }
}

/**
 * @param {string} directoryPath
 * @param {URL} imageUrl
 * @param {string} name
 */
async function downloadAsync(directoryPath, imageUrl, name) {
  const response = await fetch(imageUrl);
  const fanart = await response.arrayBuffer().then(Buffer.from.bind(Buffer));
  const poster = await getPosterAsync(fanart);
  await writeImageAsync(path.join(directoryPath, `${name}-fanart.jpg`), fanart);
  await writeImageAsync(path.join(directoryPath, `${name}.jpg`), poster);
}

/**
 * @param {string} oldPath
 * @param {string} newPath
 */
async function renameAsync(oldPath, newPath) {
  if (oldPath.localeCompare(newPath, undefined, { sensitivity: "accent" })) {
    const exists = await fs.promises
      .stat(newPath)
      .then(() => true)
      .catch(() => false);
    if (exists) {
      return false;
    } else {
      await fs.promises.rename(oldPath, newPath);
    }
  }
  return true;
}

/**
 * @param {string} filePath
 * @param {Buffer} buffer
 */
async function writeImageAsync(filePath, buffer) {
  await fs.promises.writeFile(`${filePath}.tmp`, buffer);
  await fs.promises.rename(`${filePath}.tmp`, filePath);
}
