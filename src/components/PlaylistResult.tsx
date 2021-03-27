import React from 'react';
import { YoutubeResult } from '../models/YoutubeResult';

interface PlaylistResultProps {
  youtubeResult: YoutubeResult;

  onPlaylistResultSelect: (playlistId: string) => void;
}

const PlaylistResult: React.FC<PlaylistResultProps> = ({
  youtubeResult,
  onPlaylistResultSelect,
}) => {
  const handlePlaylistResultSelect = () => {
    onPlaylistResultSelect(youtubeResult.id.playlistId);
  };

  return (
    <div className="col-5 playlist-result">
      <img
        className="playlist-result-img"
        alt={youtubeResult.snippet.title}
        title={'Разгледай'}
        onClick={handlePlaylistResultSelect}
        width={120}
        height={90}
        src={youtubeResult.snippet.thumbnails.default.url}
      />
      <div className="playlist-result-content">
        <div>
          Име на плейлиста: <b>{youtubeResult.snippet.title}</b>
        </div>
        <div>
          Име на канал: <b>{youtubeResult.snippet.channelTitle}</b>
        </div>
      </div>
    </div>
  );
};

export default PlaylistResult;
