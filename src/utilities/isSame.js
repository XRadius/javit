/**
 * @param {string} a
 * @param {string} b
 */
export function isSame(a, b) {
  const sensitivity = "accent";
  return !a.localeCompare(b, undefined, { sensitivity });
}
