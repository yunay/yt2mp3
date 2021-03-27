import React, { useState } from 'react';
import { YoutubeResult } from '../models/YoutubeResult';
import noVideo from '../../assets/no-video.png';
import { PlaylistVideoResultStatus } from '../models/Enums';

interface PlaylistVideoResultProps {
  youtubeResult: YoutubeResult;
}

const PlaylistVideoResult: React.FC<PlaylistVideoResultProps> = ({ youtubeResult}) => {
  const deletedContent = !youtubeResult.snippet.thumbnails.default  ? true : false;
  const [resultStatusMp3, setResultStatusMp3] = useState<PlaylistVideoResultStatus>(PlaylistVideoResultStatus.notMarked)
  const [resultStatusMp4, setResultStatusMp4] = useState<PlaylistVideoResultStatus>(PlaylistVideoResultStatus.notMarked)

  const classByStatus = (resultStatus:PlaylistVideoResultStatus) => {
   switch(resultStatus){
    case PlaylistVideoResultStatus.notMarked: return "";
    case PlaylistVideoResultStatus.downloaded: return "playlist-result-downloaded";
    case PlaylistVideoResultStatus.marked: return "playlist-result-marked";
    case PlaylistVideoResultStatus.error: return "playlist-result-error";
   }
  }

  const titleByStatus = (resultStatus:PlaylistVideoResultStatus) => {
    switch(resultStatus){
      case PlaylistVideoResultStatus.notMarked: return "Маркирай за изтегляне.";
      case PlaylistVideoResultStatus.downloaded: return "Успешно изтеглено.";
      case PlaylistVideoResultStatus.marked: return "Маркирано за изтегляне.";
      case PlaylistVideoResultStatus.error: return "Грешка при изтеглянето";
     }
  }

  const statusToggle = (resultStatus: PlaylistVideoResultStatus, setter:any) => {
    if(resultStatus == PlaylistVideoResultStatus.notMarked){
      setter(PlaylistVideoResultStatus.marked)
    }else{
      setter(PlaylistVideoResultStatus.notMarked)
    }
  }

  return (
    <div className="col-5 playlist-result">
      <img
        className="playlist-result-img"
        alt={youtubeResult.snippet.title}
        title={'Разгледай'}
        width={120}
        height={90}
        src={
          deletedContent
            ? noVideo
            : youtubeResult.snippet.thumbnails.default?.url
        }
      />
      <div className="playlist-result-content">
        <div className="playlist-result-info">
          <b>
            {deletedContent ? 'Изтрито видео' : youtubeResult.snippet.title}
          </b>
        </div>
      </div>
      <div className="playlist-result-options">
          <div title={titleByStatus(resultStatusMp3)} className={`playlist-result-option ${classByStatus(resultStatusMp3)}`} onClick={()=>statusToggle(resultStatusMp3, setResultStatusMp3)}>🎵</div>
          <div title={titleByStatus(resultStatusMp4)} className={`playlist-result-option ${classByStatus(resultStatusMp4)}`} onClick={()=>statusToggle(resultStatusMp4, setResultStatusMp4)}>🎬</div>
        </div>
    </div>
  );
};

export default PlaylistVideoResult;
