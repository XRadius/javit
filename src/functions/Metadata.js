export class Metadata {
  /** @readonly @type {URL} */
  imageUrl;
  /** @readonly @type {string} */
  title;
  /** @readonly @type {URL} */
  url;

  /**
   * @param {URL} imageUrl
   * @param {string} title
   * @param {URL} url
   */
  constructor(imageUrl, title, url) {
    this.imageUrl = imageUrl;
    this.title = title;
    this.url = url;
  }
}
