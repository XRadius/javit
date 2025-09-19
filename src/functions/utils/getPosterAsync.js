import sharp from "sharp";

/** @param {Buffer} buffer */
export async function getPosterAsync(buffer) {
  const image = sharp(buffer);
  const imageData = await image.metadata();
  const height = imageData.height;
  const width = imageData.width * 0.475;
  const left = imageData.width - width;
  const top = 0;
  return await image.extract({ height, width, left, top }).jpeg().toBuffer();
}
