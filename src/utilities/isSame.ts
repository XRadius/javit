export function isSame(a: string, b: string) {
  const sensitivity = 'accent';
  return !a.localeCompare(b, undefined, {sensitivity});
}
