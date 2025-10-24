const patterns = [
  /([A-Z]{2,})-([0-9]{3,})/,
  /([a-z]{2,})-([0-9]{3,})/,
  /([A-Z]{2,})([0-9]{3,})/,
  /([a-z]{2,})([0-9]{3,})/,
  /([0-9]{2,})-([0-9]{3,})/,
];

/** @param {string} name */
export function getCode(name) {
  const matches = patterns.map((pattern) => name.match(pattern));
  const match = matches.find(Boolean);
  return match ? `${match[1]?.toUpperCase()}-${match[2]}` : undefined;
}
