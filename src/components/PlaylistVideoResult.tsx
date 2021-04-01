import { observer } from 'mobx-react-lite';
import React from 'react';
import noVideo from '../../assets/no-video.png';
import { AppContext, AppStore } from '../AppContext';
import { MediaType, PlaylistVideoResultStatus } from '../models/Enums';
import { PlaylistResult } from '../models/PlaylistResult';

interface PlaylistVideoResultProps {
  playlistResult: PlaylistResult;
}

const PlaylistVideoResult: React.FC<PlaylistVideoResultProps> = observer(({ playlistResult }) => {
    const appContext = React.useContext<AppStore>(AppContext);
    const deletedContent = !playlistResult.youtubeResult.snippet.thumbnails.default ? true : false;

    const classByStatus = (resultStatus: PlaylistVideoResultStatus) => {
      switch (resultStatus) {
        case PlaylistVideoResultStatus.notMarked:
          return '';
        case PlaylistVideoResultStatus.downloaded:
          return 'playlist-result-downloaded';
        case PlaylistVideoResultStatus.marked:
          return 'playlist-result-marked';
        case PlaylistVideoResultStatus.error:
          return 'playlist-result-error';
      }
    };

    const titleByStatus = (resultStatus: PlaylistVideoResultStatus) => {
      switch (resultStatus) {
        case PlaylistVideoResultStatus.notMarked:
          return 'Маркирай за изтегляне.';
        case PlaylistVideoResultStatus.downloaded:
          return 'Успешно изтеглено.';
        case PlaylistVideoResultStatus.marked:
          return 'Маркирано за изтегляне.';
        case PlaylistVideoResultStatus.error:
          return 'Грешка при изтеглянето';
      }
    };

    const statusToggle = (resultStatus: PlaylistVideoResultStatus, mediaType: MediaType) => {
      appContext.changeStatus(playlistResult.videoId, mediaType, resultStatus == PlaylistVideoResultStatus.notMarked ? PlaylistVideoResultStatus.marked : PlaylistVideoResultStatus.notMarked)
    };

    return (
      <div className="col-5 playlist-result">
        <img
          className="playlist-result-img"
          alt={playlistResult.youtubeResult.snippet.title}
          title={'Разгледай'}
          width={120}
          height={90}
          src={
            deletedContent
              ? noVideo
              : playlistResult.youtubeResult.snippet.thumbnails.default?.url
          }
        />
        <div className="playlist-result-content">
          <div className="playlist-result-info">
            <b>
              {deletedContent
                ? 'Изтрито видео'
                : playlistResult.youtubeResult.snippet.title}
            </b>
          </div>
        </div>
        <div className="playlist-result-options">
          <div
            title={titleByStatus(playlistResult.playlistVideoResultStatusMp3)}
            className={`playlist-result-option ${classByStatus(
              playlistResult.playlistVideoResultStatusMp3
            )}`}
            onClick={() => statusToggle(playlistResult.playlistVideoResultStatusMp3, MediaType.mp3)}
          >
            🎵
          </div>
          <div
            title={titleByStatus(playlistResult.playlistVideoResultStatusMp4)}
            className={`playlist-result-option ${classByStatus(
              playlistResult.playlistVideoResultStatusMp4
            )}`}
            onClick={() => statusToggle(playlistResult.playlistVideoResultStatusMp4, MediaType.mp4)}
          >
            🎬
          </div>
        </div>
      </div>
    );
  }
);

export default PlaylistVideoResult;
