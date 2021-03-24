import { MediaType } from './Enums';
import { YoutubeResult } from './YoutubeResult';

export class HistoryRecord {
  constructor(
    _youtubeResult: YoutubeResult,
    _downloadContentType: MediaType,
    _downloadedOn: Date
  ) {
    this.resultId = _youtubeResult.id.videoId;
    this.youtubeResult = _youtubeResult;
    this.downloadContentType = _downloadContentType;
    this.downloadedOn = _downloadedOn;
  }

  public resultId: string;

  public youtubeResult: YoutubeResult;

  public downloadContentType: MediaType;

  public downloadedOn: Date;
}
