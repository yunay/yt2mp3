import { MediaType } from './Enums';
import { YoutubeResult } from './YoutubeResult';

export class HistoryRecord {
  constructor(
    _youtubeResult: YoutubeResult,
    _downloadContentType: MediaType,
    _downloadedOn: Date,
    _resultId:string
  ) {
    this.resultId = _resultId;
    this.youtubeResult = _youtubeResult;
    this.downloadContentType = _downloadContentType;
    this.downloadedOn = _downloadedOn;
  }

  public resultId: string;

  public youtubeResult: YoutubeResult;

  public downloadContentType: MediaType;

  public downloadedOn: Date;
}
