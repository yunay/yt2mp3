import React from 'react';
import { YoutubeResult } from '../models/YoutubeResult';
import { AppContext, AppData } from '../AppContext';
import { YoutubeDownloadManager } from '../common/DownloadManager';
import { MediaType } from '../models/Enums';
import { observer } from 'mobx-react-lite';

interface ResultProps {
  youtubeResult: YoutubeResult;
}

const Result: React.FC<ResultProps> = observer(({ youtubeResult }) => {
  const appContext = React.useContext<AppData>(AppContext);

  const downloadMp3 = () => {
    YoutubeDownloadManager.downloadMp3(youtubeResult, appContext);
  };

  const downloadMp4 = () => {
    YoutubeDownloadManager.downloadMp4(youtubeResult, appContext)
  };

  return (
    <div className="card col-3 result" key={youtubeResult.id.videoId}>
      <div className="existing" title="Изтеглен във формат mp3">
          {appContext.isAlreadyDownloaded(youtubeResult, MediaType.mp3) ? <span title="Изтеглен във формат mp3">🎵</span> : null}
          {appContext.isAlreadyDownloaded(youtubeResult, MediaType.mp4)? <span title="Изтеглен във формат mp4">🎬</span> : null}
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

export default Result;
