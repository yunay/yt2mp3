
export class YoutubeId {
  public videoId: string;

  public playlistId:string;
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

  public channelTitle: string;

  public thumbnails: Thumbnail;

  public resourceId: YoutubeId;
}

export class YoutubeResult {

  public id: YoutubeId;

  public etag: string;

  public snippet: YoutubeSnippet;
}
