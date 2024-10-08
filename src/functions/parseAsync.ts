import * as app from '..';
import * as path from 'node:path';

export async function parseAsync(filePath: string) {
  const name = run(path.basename(filePath));
  const value = name && (await app.metaAsync(name));
  if (value) {
    if (!app.isSame(name, run(value.title))) throw new Error('ID');
    await app.runAsync(filePath, value);
    return true;
  } else {
    return false;
  }
}

function run(fileName: string) {
  const matches = expressions.map(x => fileName.match(x));
  const match = matches.find(Boolean);
  return match ? `${match[1]?.toUpperCase()}-${match[2]}` : '';
}

const expressions = [
  /([a-z]{2,})-([0-9]{3})/,
  /([A-Z]{2,})-([0-9]{3})/,
  /([A-Z]{2,})([0-9]{3})/
];
