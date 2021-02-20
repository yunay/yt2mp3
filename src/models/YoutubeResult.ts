export class ContentDetails {
  public duration: string;
}

export class YoutubeId {
  public videoId: string;
}

export class ThumbnailType {
  public height: number;

  public url: string;

  public width: number;
}

export class Thumbnail {
  public default: ThumbnailType;

  public high: ThumbnailType;

  public medium: ThumbnailType;
}

export class YoutubeSnippet {

  public title: string;

  public description: string;

  public thumbnails: Thumbnail
}

export class YoutubeResult {

  public id: YoutubeId;

  public etag: string;

  public snippet: YoutubeSnippet;
}
