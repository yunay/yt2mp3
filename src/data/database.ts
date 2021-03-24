import { app, remote } from 'electron';
import DataStore from 'nedb';
import { HistoryRecord } from '../models/HistoryRecord';

const electronUserDataPath = (app || remote.app).getPath('userData');

console.log(electronUserDataPath);

export enum DbResponseType {
  withError = 1,
  success = 2,
}

export class DataResult {
  constructor(
    responseType: DbResponseType = DbResponseType.success,
    data: any = null
  ) {
    this.reponseType = responseType;
    this.data = data;
  }

  reponseType: DbResponseType;
  data: any;
}

const db = {
  history: new DataStore({
    filename: `${electronUserDataPath}/yt2mp3db/history.db`,
    autoload: true,
  }),
};

db.history.loadDatabase();

export const DbContext = {
  history: {
    add: (record: HistoryRecord): Promise<DataResult> => {
      return new Promise((resolve) => {
        db.history.insert(record, (err, doc) => {
          if (err) resolve(new DataResult(DbResponseType.withError, err));
          else resolve(new DataResult(DbResponseType.success, doc));
        });
      });
    },
    get: (query?: any) => query ? db.history.find(query) : db.history.find({}),
    remove: (query: any): Promise<DataResult> => {
      return new Promise((resolve) => {
        if (query) {
          db.history.remove(query, {}, (err, doc) => {
            if (err) resolve(new DataResult(DbResponseType.withError, err));
            else resolve(new DataResult(DbResponseType.success, doc));
          });
        }else {
          resolve(new DataResult(DbResponseType.withError, 'Query not found.'))
        }
      });
    },
    removeAll: (): Promise<DataResult> => {
      return new Promise((resolve) => {
        db.history.remove({}, {multi:true}, (err, doc) => {
          if (err) resolve(new DataResult(DbResponseType.withError, err));
          else resolve(new DataResult(DbResponseType.success, doc));
        });
      });
    },
  },
};
