import sharp from "sharp";

/** @param {Buffer} buffer */
export async function getPosterAsync(buffer) {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const height = metadata.height;
  const width = metadata.width * 0.475;
  const left = metadata.width - width;
  const top = 0;
  return await image.extract({ height, left, top, width }).jpeg().toBuffer();
}
