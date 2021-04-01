export enum DbResponseType {
  withError = 1,
  success = 2,
}

export class DataResult<T> {

  constructor(responseType: DbResponseType = DbResponseType.success, data: T = null, error?: Error) {
    this.reponseType = responseType;
    this.data = data;
    this.error = error;
  }

  reponseType: DbResponseType;
  data: T;
  error: Error;
}
