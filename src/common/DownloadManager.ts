import ytdl from 'ytdl-core';
import Helpers from './Helpers';
import ffmpeg from 'fluent-ffmpeg';
import jquery from 'jquery';
import { DataResult, DbResponseType } from '../models/DataResult';

export const YoutubeDownloadManager = {
  downloadMp3: (videoId:string, videoTitle:string, downloadPath: string, notify?:boolean) => {
    let stream = ytdl(videoId, { quality: 'highestaudio' });

    return new Promise<DataResult<any>>((resolve) => {
      ffmpeg(stream)
        .on('start', () => {
          jquery('#loading-screen').fadeIn();
        })
        .on('end', () => {
          jquery('#loading-screen').fadeOut();

          if(notify)
            Helpers.notify(`🥳 Свалянето на ${videoTitle}.mp3 приключи успешно.`, 'success');

          resolve(new DataResult(DbResponseType.success));
        })
        .on('error', (err) => {
          console.log(err)
          jquery('#loading-screen').fadeOut();

          if(notify)
            Helpers.notify(`😕 Възникна грешка при свалянето на ${videoTitle}.mp3`, 'error');


          resolve(new DataResult(DbResponseType.withError));
        })
        .save(`${downloadPath}\\${Helpers.text.escapeInvalidSymbolsInFilename(videoTitle)}.mp3`);
    });
  },

  downloadMp4: (videoId:string, videoTitle:string, downloadPath: string, notify?:boolean) => {
    let stream = ytdl(videoId, { quality: 18 });

    return new Promise<DataResult<any>>((resolve) => {
      ffmpeg(stream)
        .on('start', () => {
          jquery('#loading-screen').fadeIn();
        })
        .on('end', () => {
          jquery('#loading-screen').fadeOut();
          if(notify)
            Helpers.notify(`🥳 Свалянето на ${videoTitle}.mp4 приключи успешно.`, 'success');

          resolve(new DataResult(DbResponseType.success));
        })
        .on('error', (err) => {
          jquery('#loading-screen').fadeOut();

          if(notify)
            Helpers.notify(`😕 Възникна грешка при свалянето на ${videoTitle}.mp4`, 'error');

          resolve(new DataResult(DbResponseType.withError));
        })
        .save(`${downloadPath}\\${Helpers.text.escapeInvalidSymbolsInFilename(videoTitle)}.mp4`);
    });
  },
};
