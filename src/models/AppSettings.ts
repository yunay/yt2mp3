export class AppSettings {

  constructor(_downloadPath: string, id?:string) {
    this.downloadPath = _downloadPath;
    this.lastUpdatedOn = new Date();
    this.id = id ? id :Date.now().toString();
  }

  public id:string;

  public downloadPath: string;

  public lastUpdatedOn: Date;
}
