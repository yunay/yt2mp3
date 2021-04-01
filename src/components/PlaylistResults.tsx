import React, { useEffect, useState } from 'react';
import { YoutubeResult } from '../models/YoutubeResult';
import { remote } from 'electron';
import PlaylistResult from './PlaylistResult';
import { YoutubeService } from '../services/YoutubeService';
import PlaylistVideoResult from './PlaylistVideoResult';
import { AppContext, AppStore } from '../AppContext';
import { observer } from 'mobx-react-lite';
import { MediaType, PlaylistVideoResultStatus } from '../models/Enums';
import { runInAction } from 'mobx';

interface PlaylistResultsProps {
  results: YoutubeResult[];
}

const PlaylistResults: React.FC<PlaylistResultsProps> = observer((props) => {
  const appContext = React.useContext<AppStore>(AppContext);
  const [windowHeight, setWindowHeight] = useState(remote.getCurrentWindow().getBounds().height);
  const [playlistId, setPlaylistId] = useState(null);
  const youtubeService = new YoutubeService();

  useEffect(() => {
    addEventListener('resize', onWidnowRezise);
    return () => {
      removeEventListener('resize', onWidnowRezise);
    };
  }, []);

  useEffect(() => {
    if (playlistId) {
      youtubeService.getPlaylistItems(playlistId).then((results) => {
        runInAction(()=>{
          results.forEach(result => {
            if(appContext.isAlreadyDownloaded(result.youtubeResult.snippet.resourceId.videoId, MediaType.mp3)){
              result.playlistVideoResultStatusMp3 = PlaylistVideoResultStatus.downloaded;
            }

            if(appContext.isAlreadyDownloaded(result.youtubeResult.snippet.resourceId.videoId, MediaType.mp4)){
              result.playlistVideoResultStatusMp4 = PlaylistVideoResultStatus.downloaded;
            }
          })
        })

        appContext.playlistVideoResults = results;
      });
    }
  }, [playlistId]);

  const onWidnowRezise = () => {
    setWindowHeight(remote.getCurrentWindow().getBounds().height);
  };

  const handleBackBtnClick = () => {
    setPlaylistId(null);
  };

  const toggleMarkAllPlaylistResylts = (mediaType:MediaType)=>{
    if(appContext.playlistVideoResults && appContext.playlistVideoResults.length > 0){

      appContext.markUnmarkAll(mediaType)
    }
  }

  return (
    <div id="results" style={{ height: windowHeight / 1.32 }}>
      {playlistId && (
        <div className="row" style={{width:"98%"}}>
          <div className="col-3">
            <button className="playlist-results-btn" onClick={()=>toggleMarkAllPlaylistResylts(MediaType.mp3)}>
              { appContext.playlistVideoResults.findIndex(x=>x.playlistVideoResultStatusMp3 != PlaylistVideoResultStatus.marked) != -1 ? "Маркирай всички Mp3" : "Отмаркирай всички Mp3"}
            </button>
          </div>
          <div className="col-3">
            <button className="playlist-results-btn" onClick={()=>toggleMarkAllPlaylistResylts(MediaType.mp4)}>
            { appContext.playlistVideoResults.findIndex(x=>x.playlistVideoResultStatusMp4 != PlaylistVideoResultStatus.marked) != -1 ? "Маркирай всички Mp4" : "Отмаркирай всички Mp4"}
            </button>
          </div>
          <div className="col-3">
            <button className="playlist-results-btn" onClick={appContext.downloadAllMarkedPlaylistResults}>
              Изтегли всички маркирани
            </button>
          </div>
          <div className="col-3">
            <button className="playlist-results-btn" onClick={handleBackBtnClick}>
              Назад
            </button>
          </div>
        </div>
      )}

      <div className="row">
        {!playlistId &&
          props.results &&
          props.results.map((result) => (
            <PlaylistResult
              onPlaylistResultSelect={setPlaylistId}
              key={result.id.playlistId}
              youtubeResult={result}
            />
          ))}
        {playlistId &&
          appContext.playlistVideoResults &&
          appContext.playlistVideoResults.map((result) => (
            <PlaylistVideoResult
              key={result.youtubeResult.snippet.resourceId.videoId}
              playlistResult={result}
            />
          ))}
      </div>
    </div>
  );
});

export default PlaylistResults;
