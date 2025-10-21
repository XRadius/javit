/**
 * @param {string} code
 * @param {string} title
 */
export function normalizeTitle(code, title) {
  return `${code} ${title
    .replaceAll(new RegExp(code, "ig"), "")
    .replaceAll(/\[[^\]]+\]/g, "")
    .replaceAll(/\s+/g, " ")
    .trim()}`;
}
