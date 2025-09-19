/** @param {string} title */
export function normalizeTitle(title) {
  return title
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
