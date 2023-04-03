export async function traceAsync(name: string, resultAsync: Promise<boolean>) {
  try {
    const result = await resultAsync;
    const status = result ? 'OK' : 'Not Found';
    console.log(`Finished ${name} (${status})`);
  } catch (err) {
    const status = err instanceof Error ? err.stack : err;
    console.log(`Rejected ${name}: ${status}`);
  }
}
