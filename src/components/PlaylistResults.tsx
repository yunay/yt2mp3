import React, { useEffect, useState } from 'react';
import { YoutubeResult } from '../models/YoutubeResult';
import { remote } from 'electron';
import PlaylistResult from './PlaylistResult';
import { YoutubeService } from '../services/YoutubeService';
import PlaylistVideoResult from './PlaylistVideoResult';

interface PlaylistResultsProps {
  results: YoutubeResult[];
}

const PlaylistResults: React.FC<PlaylistResultsProps> = (props) => {
  const [windowHeight, setWindowHeight] = useState(
    remote.getCurrentWindow().getBounds().height
  );
  const [playlistId, setPlaylistId] = useState(null);
  const [playlistVideoResults, setPlaylistVideoResults] = useState(null);
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
        setPlaylistVideoResults(results);
      });
    }
  }, [playlistId]);

  const onWidnowRezise = () => {
    setWindowHeight(remote.getCurrentWindow().getBounds().height);
  };

  const handleBackBtnClick = () => {
    setPlaylistId(null);
  };

  return (
    <div id="results" style={{ height: windowHeight / 1.32 }}>
      {playlistId && (
        <div className="row" style={{width:"98%"}}>
          <div className="col-3">
            <button className="playlist-results-btn" onClick={handleBackBtnClick}>
              Маркирай всички Mp3
            </button>
          </div>
          <div className="col-3">
            <button className="playlist-results-btn" onClick={handleBackBtnClick}>
              Маркирай всички Mp4
            </button>
          </div>
          <div className="col-3">
            <button className="playlist-results-btn" onClick={handleBackBtnClick}>
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
          playlistVideoResults &&
          playlistVideoResults.map((result) => (
            <PlaylistVideoResult
              key={result.snippet.resourceId.videoId}
              youtubeResult={result}
            />
          ))}
      </div>
    </div>
  );
};

export default PlaylistResults;
