import sharp from "sharp";

/** @param {Buffer} buffer */
export async function getFanartAsync(buffer) {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  return metadata.format === "jpeg" ? buffer : await image.jpeg().toBuffer();
}
