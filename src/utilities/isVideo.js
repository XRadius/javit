/** @param {string} filePath */
export function isVideo(filePath) {
  return /\.(avi|mp4|mkv|ogm|webm)$/i.test(filePath);
}
