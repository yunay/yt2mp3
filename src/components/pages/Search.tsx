import React, { useState } from 'react'
import { YoutubeResult } from '../../models/YoutubeResult';
import { YoutubeService } from '../../services/YoutubeService';
import Results from '../Results'
import SearchPanel from '../SearchPanel'

const Search = () => {

  const [results, loadResults] = useState<YoutubeResult[]>();
  const youtubeService = new YoutubeService();

  const onSearchCallback = (keyword: string) => {
    youtubeService.getVideos(keyword).then((results) => {
      loadResults(results);
    });
  };

  return (
    <div>
        <SearchPanel onSearchCallback={onSearchCallback} />
        <Results results={results} />
    </div>
  )
}

export default Search
