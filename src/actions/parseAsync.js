import * as app from "../index.js";
import * as fs from "node:fs";
import * as path from "node:path";
import { traceAsync } from "./helpers/traceAsync.js";

/**
 * @param {string[]} paths
 * @param {Options} options
 */
export async function parseAsync(paths, options) {
  for (const path of paths) {
    await checkAsync(path, options);
  }
}

/**
 * @param {string} path
 * @param {Options} options
 */
async function checkAsync(path, options) {
  const stats = await fs.promises.stat(path).catch(() => {});
  if (!stats) {
    console.log(`Rejected ${path}`);
  } else if (stats.isDirectory()) {
    console.log(`Checking ${path}`);
    await directoryAsync(path, options);
    console.log(`Finished ${path}`);
  } else if (stats.isFile() && app.isVideo(path)) {
    console.log(`Fetching ${path}`);
    await traceAsync(path, app.parseAsync(path));
  }
}

/**
 * @param {string} directoryPath
 * @param {Options} options
 */
async function directoryAsync(directoryPath, options) {
  const names = await fs.promises.readdir(directoryPath).catch(() => []);
  const paths = new Set(names.map((x) => path.join(directoryPath, x)));
  for (const path of paths) {
    const stats = await fs.promises.stat(path).catch(() => {});
    if (stats?.isDirectory()) {
      await checkAsync(path, options);
    } else if (stats?.isFile() && app.isVideo(path)) {
      const basePath = path.replace(/\.[^\.]+$/, "");
      const fanartPath = `${basePath}-fanart.jpg`;
      const posterPath = `${basePath}.jpg`;
      if (options.force || !paths.has(fanartPath) || !paths.has(posterPath)) {
        await fs.promises.unlink(fanartPath).catch(() => {});
        await fs.promises.unlink(posterPath).catch(() => {});
        await checkAsync(path, options);
      }
    }
  }
}
