import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import Results from './components/Results';
import Search from './components/Search';
import { YoutubeResult } from './models/YoutubeResult';
import { YoutubeService } from './services/YoutubeService';

const Layout = () => {
  const [results, loadResults] = useState<YoutubeResult[]>();
  const youtubeService = new YoutubeService();

  const onSearchCallback = (keyword: string) => {
    youtubeService.getVideos(keyword).then((results) => {
      loadResults(results);
    });
  };

  return (
    <>
      <ToastContainer />
      <div id="main-container">
        <Search onSearchCallback={onSearchCallback} />
        <Results results={results} />
      </div>
      <div id="loading-screen">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    </>
  );
};

export default Layout;
