import { MediaType } from './Enums';
import { YoutubeResult } from './YoutubeResult';

export class History {
  constructor(
    _youtubeResult: YoutubeResult,
    _downloadContentType: MediaType,
    _downloadedOn: Date
  ) {
    this.youtubeResult = _youtubeResult;
    this.downloadContentType = _downloadContentType;
    this.downloadedOn = _downloadedOn;
  }

  public youtubeResult: YoutubeResult;

  public downloadContentType: MediaType;

  public downloadedOn: Date;
}
