import React from 'react';
import { YoutubeResult } from '../models/YoutubeResult';
import { remote } from 'electron';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import jquery from 'jquery'
import Helpers from '../common/Helpers';

interface ResultProps {
  youtubeResult: YoutubeResult;
}

const Result: React.FC<ResultProps> = ({ youtubeResult }) => {
  const downloadMp3 = () => {
    remote.dialog
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
              jquery("#loading-screen").fadeIn();
            })
            .on('end', () => {
              jquery("#loading-screen").fadeOut();
              Helpers.notify(`🥳 Свалянето на ${youtubeResult.snippet.title}.mp3 приключи успешно.`, "success");
            })
            .on('error', (err) => {
              jquery("#loading-screen").fadeOut();
              Helpers.notify(`😕 Възникна грешка при свалянето на ${youtubeResult.snippet.title}.mp3`, "error");
              console.error(err)
            })
            .save(
              `${result.filePaths[0]}\\${Helpers.text.escapeInvalidSymbolsInFilename(youtubeResult.snippet.title)}.mp3`
            );
        }
      });
  };

  return (
    <div className="card col-3 result" key={youtubeResult.id.videoId}>
      <iframe
        itemType="text/html"
        width="418"
        height="313"
        src={`https://www.youtube.com/embed/${youtubeResult.id.videoId}?fs=0&hl=bg&rel=0&controls=0"`}
        frameBorder="0"
      />
      <div className="btn-group">
        <ul className="result-buttons nav nav-tabs">
          <li className="nav-item w-50" onClick={downloadMp3}>
            🎵 mp3
          </li>
          <li className="nav-item w-50">🎬 mp4</li>
        </ul>
      </div>
    </div>
  );
};

export default Result;
