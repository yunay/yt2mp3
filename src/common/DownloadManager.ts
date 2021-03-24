import { remote } from 'electron';
import ytdl from 'ytdl-core';
import { MediaType } from '../models/Enums';
import { HistoryRecord } from '../models/HistoryRecord';
import { YoutubeResult } from '../models/YoutubeResult';
import Helpers from './Helpers';
import ffmpeg from 'fluent-ffmpeg';
import jquery from 'jquery';
import { AppData } from '../AppContext';

export const YoutubeDownloadManager = {
  downloadMp3: (youtubeResult: YoutubeResult, appContext: AppData) => {
    return remote.dialog
      .showOpenDialog({
        properties: ['openDirectory'],
        filters: [{ name: 'Music', extensions: ['mp3'] }],
      })
      .then((result) => {
        if (result.filePaths && result.filePaths.length > 0) {
          let stream = ytdl(youtubeResult.id.videoId, {
            quality: 'highestaudio',
          });

          ffmpeg(stream)
            .on('start', () => {
              jquery('#loading-screen').fadeIn();
            })
            .on('end', () => {
              jquery('#loading-screen').fadeOut();
              appContext.addHistoryRecord(
                new HistoryRecord(youtubeResult, MediaType.mp3, new Date())
              );
              Helpers.notify(
                `🥳 Свалянето на ${youtubeResult.snippet.title}.mp3 приключи успешно.`,
                'success'
              );
            })
            .on('error', (err) => {
              jQuery('#loading-screen').fadeOut();
              Helpers.notify(
                `😕 Възникна грешка при свалянето на ${youtubeResult.snippet.title}.mp3`,
                'error'
              );
              console.error(err);
            })
            .save(
              `${
                result.filePaths[0]
              }\\${Helpers.text.escapeInvalidSymbolsInFilename(
                youtubeResult.snippet.title
              )}.mp3`
            );
        }
      });
  },

  downloadMp4: (youtubeResult: YoutubeResult, appContext: AppData) => {
    return remote.dialog
      .showOpenDialog({
        properties: ['openDirectory'],
        filters: [{ name: 'Music', extensions: ['mp4'] }],
      })
      .then((result) => {
        if (result.filePaths && result.filePaths.length > 0) {
          let stream = ytdl(youtubeResult.id.videoId, {
            quality: 18,
          });

          ffmpeg(stream)
            .on('start', () => {
              jquery('#loading-screen').fadeIn();
            })
            .on('end', () => {
              jquery('#loading-screen').fadeOut();
              appContext.addHistoryRecord(
                new HistoryRecord(youtubeResult, MediaType.mp4, new Date())
              );
              Helpers.notify(
                `🥳 Свалянето на ${youtubeResult.snippet.title}.mp4 приключи успешно.`,
                'success'
              );
            })
            .on('error', (err) => {
              jquery('#loading-screen').fadeOut();
              Helpers.notify(
                `😕 Възникна грешка при свалянето на ${youtubeResult.snippet.title}.mp4`,
                'error'
              );
              console.error(err);
            })
            .save(
              `${
                result.filePaths[0]
              }\\${Helpers.text.escapeInvalidSymbolsInFilename(
                youtubeResult.snippet.title
              )}.mp4`
            );
        }
      });
  },
};
