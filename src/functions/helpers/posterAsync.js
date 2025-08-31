import sharp from "sharp";

/** @param {Buffer} buffer */
export async function posterAsync(buffer) {
  const image = sharp(buffer);
  const imageData = await image.metadata();
  const height = imageData.height ?? 0;
  const width = (imageData.width ?? 0) * 0.475;
  const left = (imageData.width ?? 0) - width;
  return await image.extract({ height, width, left, top: 0 }).jpeg().toBuffer();
}
