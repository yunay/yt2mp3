import { makeAutoObservable } from "mobx";
import { PlaylistVideoResultStatus } from "./Enums";
import { YoutubeResult } from "./YoutubeResult";

export class PlaylistResult{

  constructor(youtubeResult: YoutubeResult){
    makeAutoObservable(this);

    this.youtubeResult = youtubeResult;
    this.videoId = youtubeResult.snippet.resourceId.videoId;
    this.playlistVideoResultStatusMp3 = PlaylistVideoResultStatus.notMarked
    this.playlistVideoResultStatusMp4 = PlaylistVideoResultStatus.notMarked
  }

  public videoId:string;

  public youtubeResult:YoutubeResult;

  public playlistVideoResultStatusMp3:PlaylistVideoResultStatus;

  public playlistVideoResultStatusMp4:PlaylistVideoResultStatus;
}
