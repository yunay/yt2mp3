import React, { useEffect, useState } from 'react';
import { YoutubeResult } from '../models/YoutubeResult';
import { remote } from 'electron';
import VideoResult from './VideoResult';

interface VideoResultsProps {
  results: YoutubeResult[];
}

const VideoResults: React.FC<VideoResultsProps> = (props) => {
  const [windowHeight, setWindowHeight] = useState(remote.getCurrentWindow().getBounds().height);

  useEffect(() => {
    addEventListener('resize', onWidnowRezise);

    return () => {
      removeEventListener('resize', onWidnowRezise);
    };
  }, []);

  const onWidnowRezise = () => {
    setWindowHeight(remote.getCurrentWindow().getBounds().height);
  };

  return (
    <div id="results" style={{ height: windowHeight / 1.32 }}>
      <div className="row">
        {props.results && props.results.map((result) => <VideoResult key={result.id.videoId}  youtubeResult={result}/>)}
      </div>
    </div>
  );
};

export default VideoResults;
