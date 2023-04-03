import {DateTime} from 'luxon';

export interface Metadata {
  /**
   * The preview URL.
   */
  previewUrl: URL;

  /**
   * The release date.
   */
  releaseDate: DateTime;

  /**
   * The title.
   */
  title: string;
}

export interface Options {
  /**
   * Determines whether to force a refresh.
   */
  force?: true;
}
