import { makeAutoObservable } from 'mobx';
import React from 'react';
import { DbContext, DbResponseType } from './data/database';
import { MediaType } from './models/Enums';
import { HistoryRecord } from './models/HistoryRecord';
import { YoutubeResult } from './models/YoutubeResult';

export const AppContext = React.createContext<AppStore>(null);

export class AppStore {
  public historyRecords: HistoryRecord[] = [];

  public mp3mp4ForDownload: { mediaType:MediaType, resultId:string}[] = [];

  constructor() {
    makeAutoObservable(this);
  }

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

  public isAlreadyDownloaded(result: YoutubeResult, mediaType: MediaType) {
    if (this.historyRecords && this.historyRecords.length > 0) {
      var isFound = false;

      this.historyRecords.forEach((x) => {
        if (
          x.resultId == result.id.videoId &&
          x.downloadContentType == mediaType
        )
          isFound = true;
      });

      return isFound;
    }

    return false;
  }
}
