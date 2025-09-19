import fs from "node:fs";
import path from "node:path";
import sanitizeFilename from "sanitize-filename";
import { getCode } from "./getCode.js";
import { getPosterAsync } from "./utils/getPosterAsync.js";
import { searchAsync } from "./searchAsync.js";

/** @param {string} filePath */
export async function parseAsync(filePath) {
  const { dir, ext, name } = path.parse(filePath);
  const code = getCode(name);
  const metadata = code ? await searchAsync(code) : undefined;
  if (metadata) {
    const newName = sanitizeFilename(metadata.title).slice(0, 120).trim();
    const newPath = path.join(dir, newName + ext);
    const didFail = await renameAsync(filePath, newPath);
    if (!didFail) {
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
 * @param {string} dir
 * @param {URL} imageUrl
 * @param {string} name
 */
async function downloadAsync(dir, imageUrl, name) {
  const response = await fetch(imageUrl);
  const fanart = await response.arrayBuffer().then(Buffer.from);
  const poster = await getPosterAsync(fanart);
  await fs.promises.writeFile(path.join(dir, `${name}-fanart.jpg`), fanart);
  await fs.promises.writeFile(path.join(dir, `${name}.jpg`), poster);
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
      return true;
    } else {
      await fs.promises.rename(oldPath, newPath);
    }
  }
  return false;
}
