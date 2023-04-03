export function isVideo(filePath: string) {
  return /\.(avi|mp4|mkv|ogm|webm)$/i.test(filePath);
}
