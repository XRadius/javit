import fs from "node:fs";
import path from "node:path";
import sanitizeFilename from "sanitize-filename";
import { getCode } from "./utils/getCode.js";
import { posterAsync } from "./utils/posterAsync.js";
import { searchAsync } from "./searchAsync.js";

/** @param {string} filePath */
export async function parseAsync(filePath) {
  const { dir, name, ext } = path.parse(filePath);
  const code = getCode(name);
  const metadata = code ? await searchAsync(code) : undefined;
  if (metadata) {
    if (getCode(metadata.title) !== code) throw new Error("Mismatch");
    const newName = sanitizeFilename(metadata.title).slice(0, 120).trim();
    const newPath = path.join(dir, newName + ext);
    await organizeAsync(filePath, newPath);
    await downloadAsync(dir, newName, metadata.previewUrl);
    return true;
  } else {
    return false;
  }
}

/**
 * @param {string} dir
 * @param {string} name
 * @param {URL} previewUrl
 */
async function downloadAsync(dir, name, previewUrl) {
  const response = await fetch(previewUrl);
  const fanart = await response.arrayBuffer().then(Buffer.from);
  const poster = await posterAsync(fanart);
  await fs.promises.writeFile(path.join(dir, `${name}-fanart.jpg`), fanart);
  await fs.promises.writeFile(path.join(dir, `${name}.jpg`), poster);
}

/**
 * @param {string} oldPath
 * @param {string} newPath
 */
async function organizeAsync(oldPath, newPath) {
  if (oldPath.localeCompare(newPath, undefined, { sensitivity: "accent" })) {
    const existingStats = await fs.promises
      .stat(newPath)
      .catch(() => undefined);
    if (existingStats) {
      throw new Error("Duplicate");
    } else {
      await fs.promises.rename(oldPath, newPath);
    }
  }
}
