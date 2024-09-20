export interface Metadata {
  /**
   * The preview URL.
   */
  previewUrl: URL;

  /**
   * The title.
   */
  title: string;
}

export interface Options {
  /**
   * Determines whether to force a refresh.
   */
  force?: boolean;
}
