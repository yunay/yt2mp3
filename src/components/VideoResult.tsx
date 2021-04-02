import React from 'react';
import { YoutubeResult } from '../models/YoutubeResult';
import { AppContext, AppStore } from '../AppContext';
import { YoutubeDownloadManager } from '../common/DownloadManager';
import { observer } from 'mobx-react-lite';
import { MediaType } from '../models/Enums';
import { HistoryRecord } from '../models/HistoryRecord';
import { DbResponseType } from '../models/DataResult';
import jquery from 'jquery';

interface VideoResultProps {
  youtubeResult: YoutubeResult;
}

const VideoResult: React.FC<VideoResultProps> = observer(({ youtubeResult }) => {
  const appContext = React.useContext<AppStore>(AppContext);

  const downloadMp3 = () => {
    jquery('#loading-screen').fadeIn();
    YoutubeDownloadManager.downloadMp3(youtubeResult.id.videoId,youtubeResult.snippet.title, appContext.settings.downloadPath, true).then((result)=>{

      jquery('#loading-screen').fadeOut();

      if(result.reponseType == DbResponseType.success)
        appContext.addHistoryRecord(new HistoryRecord(youtubeResult, MediaType.mp3, new Date(), youtubeResult.id.videoId));
    });
  };

  const downloadMp4 = () => {
    jquery('#loading-screen').fadeIn();

    YoutubeDownloadManager.downloadMp4(youtubeResult.id.videoId,youtubeResult.snippet.title, appContext.settings.downloadPath, true).then((result)=>{
      jquery('#loading-screen').fadeOut();

      if(result.reponseType == DbResponseType.success)
        appContext.addHistoryRecord(new HistoryRecord(youtubeResult, MediaType.mp4, new Date(), youtubeResult.id.videoId));
    })
  };

  return (
    <div className="card col-3 result" key={youtubeResult.id.videoId}>
      <div className="existing">
        {appContext.isAlreadyDownloaded(youtubeResult.id.videoId, MediaType.mp3) ? <span title="Изтеглен във формат mp3">🎵</span> : null}
        {appContext.isAlreadyDownloaded(youtubeResult.id.videoId, MediaType.mp4) ? <span title="Изтеглен във формат mp4">🎬</span> : null}
        </div>
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
          <li className="nav-item w-50" onClick={downloadMp4}>
            🎬 mp4
          </li>
        </ul>
      </div>
    </div>
  );
});

export default VideoResult;
