import * as javit from "../index.js";
import fs from "node:fs";
import path from "node:path";

/**
 * @param {string[]} paths
 * @param {{ force?: boolean }} options
 */
export async function parseAsync(paths, options) {
  for (const path of paths) {
    await checkAsync(path, Boolean(options.force));
  }
}

/**
 * @param {string} path
 * @param {boolean} force
 */
async function checkAsync(path, force) {
  const stats = await fs.promises.stat(path).catch(() => undefined);
  if (!stats) {
    console.log(`Rejected ${path}`);
  } else if (stats.isDirectory()) {
    console.log(`Checking ${path}`);
    await directoryAsync(path, force);
    console.log(`Finished ${path}`);
  } else if (stats.isFile() && isVideo(path)) {
    console.log(`Fetching ${path}`);
    const status = await javit.parseAsync(path);
    console.log(`Finished ${path} (${status})`);
  }
}

/**
 * @param {string} directoryPath
 * @param {boolean} force
 */
async function directoryAsync(directoryPath, force) {
  const childNames = await fs.promises.readdir(directoryPath).catch(() => []);
  const childPaths = childNames.map((name) => path.join(directoryPath, name));
  const childSet = new Set(childPaths);
  for (const childPath of childPaths) {
    const stats = await fs.promises.stat(childPath).catch(() => undefined);
    if (stats?.isDirectory()) {
      await checkAsync(childPath, force);
    } else if (stats?.isFile() && isVideo(childPath)) {
      const { dir, name } = path.parse(childPath);
      const fanartPath = path.join(dir, `${name}-fanart.jpg`);
      const posterPath = path.join(dir, `${name}.jpg`);
      if (force || !childSet.has(fanartPath) || !childSet.has(posterPath)) {
        await fs.promises.unlink(fanartPath).catch(() => undefined);
        await fs.promises.unlink(posterPath).catch(() => undefined);
        await checkAsync(childPath, force);
      }
    }
  }
}

/** @param {string} filePath */
function isVideo(filePath) {
  return /\.(avi|mp4|mkv|ogm|webm)$/i.test(filePath);
}
