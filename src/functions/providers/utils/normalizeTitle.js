/** @param {string} title */
export function normalizeTitle(title) {
  return title
    .replaceAll(/\[[^\]]+\]/g, "")
    .replaceAll(/\s+/g, " ")
    .trim();
}
