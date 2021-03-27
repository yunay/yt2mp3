import React, { useState } from 'react'
import { SearchType } from '../../models/Enums';
import { YoutubeResult } from '../../models/YoutubeResult';
import { YoutubeService } from '../../services/YoutubeService';
import VideoResults from '../VideoResults'
import SearchPanel from '../SearchPanel'
import PlaylistResults from '../PlaylistResults';

const Search = () => {
  const [state, setState] = useState<{results:YoutubeResult[], searchType:SearchType}>({results: [], searchType:SearchType.videos})
  const youtubeService = new YoutubeService();

  const onSearchCallback = (keyword: string, searchType:SearchType) => {

    if(searchType == SearchType.videos){
      youtubeService.getVideosByText(keyword).then((results) => {
        setState({results, searchType})
      });
    }else if(searchType == SearchType.playlists){
      youtubeService.getPlaylistsByText(keyword).then((results) => {
        setState({results, searchType})
      });
    }
  };

  return (
    <div>
        <SearchPanel onSearchCallback={onSearchCallback} />
        {
          state.searchType == SearchType.videos
          ? <VideoResults results={state.results} />
          : <PlaylistResults results={state.results} />
        }
    </div>
  )
}

export default Search
