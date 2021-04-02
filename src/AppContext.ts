import { remote } from 'electron';
import jquery from 'jquery';
import { makeAutoObservable, runInAction } from 'mobx';
import React from 'react';
import { YoutubeDownloadManager } from './common/DownloadManager';
import { DbContext } from './data/database';
import { AppSettings } from './models/AppSettings';
import { DbResponseType } from './models/DataResult';
import { MediaType, PlaylistVideoResultStatus } from './models/Enums';
import { HistoryRecord } from './models/HistoryRecord';
import { PlaylistResult } from './models/PlaylistResult';

export const AppContext = React.createContext<AppStore>(null);

export class AppStore {
  public historyRecords: HistoryRecord[] = [];

  public playlistVideoResults: PlaylistResult[] = [];

  public settings: AppSettings;

  constructor() {
    makeAutoObservable(this);

    this.downloadAllMarkedPlaylistResults = this.downloadAllMarkedPlaylistResults.bind(this);
  }

  //#region playlistVideoResults

  public markUnmarkAll(mediaType:MediaType){

    let statusMp3: PlaylistVideoResultStatus = this.playlistVideoResults.findIndex(x=>x.playlistVideoResultStatusMp3 != PlaylistVideoResultStatus.marked) != -1
    ? PlaylistVideoResultStatus.marked
    : PlaylistVideoResultStatus.notMarked;

    let statusMp4: PlaylistVideoResultStatus = this.playlistVideoResults.findIndex(x=>x.playlistVideoResultStatusMp4 != PlaylistVideoResultStatus.marked) != -1
    ? PlaylistVideoResultStatus.marked
    : PlaylistVideoResultStatus.notMarked;

    for(var i = 0; i < this.playlistVideoResults.length;i++){
      if(mediaType == MediaType.mp3){
        this.playlistVideoResults[i].playlistVideoResultStatusMp3 = statusMp3;
      }else if(mediaType == MediaType.mp4){
        this.playlistVideoResults[i].playlistVideoResultStatusMp4 = statusMp4;
      }
    }
  }

  public changeStatus(id:string, mediaType:MediaType, status:PlaylistVideoResultStatus){
    let index = this.playlistVideoResults.findIndex(x=>x.videoId == id);
    if(index != -1){
      if(mediaType == MediaType.mp3){
        this.playlistVideoResults[index].playlistVideoResultStatusMp3 = status;
      }else if(mediaType == MediaType.mp4){
        this.playlistVideoResults[index].playlistVideoResultStatusMp4 = status;
      }
    }
  }

  public async downloadAllMarkedPlaylistResults(){

      jquery('#loading-screen').fadeIn();

      await Promise.all(this.playlistVideoResults.map(async (playlistVideoResult) => {
        if(playlistVideoResult.playlistVideoResultStatusMp3 == PlaylistVideoResultStatus.marked){
          await YoutubeDownloadManager.downloadMp3(playlistVideoResult.youtubeResult.snippet.resourceId.videoId,playlistVideoResult.youtubeResult.snippet.title, this.settings.downloadPath).then(result => {

            runInAction(()=>{
              playlistVideoResult.playlistVideoResultStatusMp3 = result.reponseType == DbResponseType.success ? PlaylistVideoResultStatus.downloaded : PlaylistVideoResultStatus.error;

              if(result.reponseType == DbResponseType.success)
                this.addHistoryRecord(new HistoryRecord(playlistVideoResult.youtubeResult, MediaType.mp3, new Date(), playlistVideoResult.youtubeResult.snippet.resourceId.videoId));
            })

          })
        }

        if(playlistVideoResult.playlistVideoResultStatusMp4 == PlaylistVideoResultStatus.marked){
          await YoutubeDownloadManager.downloadMp4(playlistVideoResult.youtubeResult.snippet.resourceId.videoId,playlistVideoResult.youtubeResult.snippet.title, this.settings.downloadPath).then(result => {

            runInAction(()=>{
              playlistVideoResult.playlistVideoResultStatusMp4 = result.reponseType == DbResponseType.success ? PlaylistVideoResultStatus.downloaded : PlaylistVideoResultStatus.error;

              if(result.reponseType == DbResponseType.success)
                this.addHistoryRecord(new HistoryRecord(playlistVideoResult.youtubeResult, MediaType.mp4, new Date(), playlistVideoResult.youtubeResult.snippet.resourceId.videoId));
            })
          })
        }
      })).finally(()=>{
        jquery('#loading-screen').fadeOut();
      })
  }

  //#endregion

  //#region historyRecords

  public addHistoryRecord(newRecord: HistoryRecord) {
    var that = this;

    DbContext.history.add(newRecord).then(() => {
      that.historyRecords.push(newRecord);
    });
  }

  public removeHistoryRecord(record: HistoryRecord) {
    var that = this;

    return DbContext.history
      .remove({ resultId: record.resultId })
      .then((result) => {
        if (result.reponseType == DbResponseType.success) {
          let indexElement = that.historyRecords.indexOf(record);
          that.historyRecords.splice(indexElement, 1);
        }
      });
  }

  public clearAllHistory() {
    var that = this;

    return DbContext.history.removeAll().then((result) => {
      if (result.reponseType == DbResponseType.success) {
        that.historyRecords = [];
      }
    });
  }

  //#endregion

  //#region AppSettings

  public updateSettings(newSettings:AppSettings){
    DbContext.settings.update(newSettings).then((result)=>{
      if(result.reponseType = DbResponseType.success){
        runInAction(()=>{
          this.settings.downloadPath = result.data.downloadPath;
          this.settings.lastUpdatedOn = result.data.lastUpdatedOn;
        })
      }else if(result.reponseType = DbResponseType.withError){
        console.log(result.error)
      }
    })
  }

  //#endregion

  public isAlreadyDownloaded(videoId, mediaType: MediaType) {
    if (this.historyRecords && this.historyRecords.length > 0) {
      var isFound = false;

      this.historyRecords.forEach((x) => {
        if (x.resultId == videoId && x.downloadContentType == mediaType)
          isFound = true;
      });

      return isFound;
    }

    return false;
  }
}
