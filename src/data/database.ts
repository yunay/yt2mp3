import { app, remote } from 'electron';
import DataStore from 'nedb';
import { AppSettings } from '../models/AppSettings';
import { DataResult, DbResponseType } from '../models/DataResult';
import { HistoryRecord } from '../models/HistoryRecord';
import {existsSync, mkdirSync} from 'fs-extra'

const electronUserDataPath = (app || remote.app).getPath('userData');

console.log(electronUserDataPath);

const db = {
  history: new DataStore({
    filename: `${electronUserDataPath}/yt2mp3db/history.db`,
    autoload: true,
  }),
  settings: new DataStore({
    filename: `${electronUserDataPath}/yt2mp3db/settings.db`,
    autoload: true,
  })
};

db.history.loadDatabase();
db.settings.loadDatabase();

export const DbContext = {
  history: {
    add: (record: HistoryRecord): Promise<DataResult<HistoryRecord>> => {
      return new Promise((resolve) => {
        db.history.insert(record, (err, doc) => {
          if (err) resolve(new DataResult(DbResponseType.withError, null, err));
          else resolve(new DataResult(DbResponseType.success, doc));
        });
      });
    },
    get: (query?: any) => query ? db.history.find(query) : db.history.find({}),
    remove: (query: any): Promise<DataResult<null>> => {
      return new Promise((resolve) => {
        if (query) {
          db.history.remove(query, {}, (err, doc) => {
            if (err) resolve(new DataResult(DbResponseType.withError, null, err));
            else resolve(new DataResult(DbResponseType.success, null));
          });
        }else {
          resolve(new DataResult(DbResponseType.withError, null))
        }
      });
    },
    removeAll: (): Promise<DataResult<null>> => {
      return new Promise((resolve) => {
        db.history.remove({}, {multi:true}, (err, doc) => {
          if (err) resolve(new DataResult(DbResponseType.withError,null, err));
          else resolve(new DataResult(DbResponseType.success, null));
        });
      });
    },
  },
  settings:{
    init: (): AppSettings => {

      let downloadDir = 'C:\\yt2mp3-downloads';
      let appSettings = new AppSettings(downloadDir);

      if (!existsSync(downloadDir))
        mkdirSync(downloadDir);

      db.settings.insert(appSettings, (err, doc) => {
        if (err) {
          console.log(err)
          return null;
        }
        else
          return appSettings
      });

      return appSettings;
    },
    get: () => db.settings.find({}),
    update: (newSettings:AppSettings) :Promise<DataResult<AppSettings>> => {

      return new Promise((resolve)=>{
        db.settings.update({ id: newSettings.id }, newSettings, { multi: true }, (err) => {
          if (err)
            resolve(new DataResult(DbResponseType.withError, null, err));
          else
            resolve(new DataResult(DbResponseType.success, newSettings));
        })
      })
    }
  }
}
