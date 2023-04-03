import * as app from '..';
import * as path from 'node:path';

export async function parseAsync(filePath: string) {
  const name = match(path.basename(filePath));
  const value = name && (await app.metaAsync(name));
  if (value) {
    if (!app.isSame(name, match(value.title))) throw new Error('Invalid title');
    if (!value.releaseDate.isValid) throw new Error('Invalid release date');
    await app.runAsync(filePath, value);
    return true;
  } else {
    return false;
  }
}

function match(fileName: string) {
  const expression = /([A-Z]{2,})-?([0-9]{3})/i;
  const match = fileName.match(expression);
  return match ? `${match[1]?.toUpperCase()}-${match[2]}` : '';
}
