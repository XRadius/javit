/**
 * @param {string} name
 * @param {Promise<boolean>} resultAsync
 */
export async function traceAsync(name, resultAsync) {
  try {
    const result = await resultAsync;
    const status = result ? "OK" : "Not Found";
    console.log(`Finished ${name} (${status})`);
  } catch (err) {
    const status = err instanceof Error ? err.stack : err;
    console.log(`Rejected ${name}: ${status}`);
  }
}
