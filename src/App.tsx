import React, { useEffect, useState } from 'react';
import ffmpeg from 'fluent-ffmpeg';
import './App.global.css';
import config from '../config';
import Layout from './Layout';
import { ToastContainer } from 'react-toastify';
import { DbContext } from './data/database';
import { AppContext, AppStore } from './AppContext';

export default function App() {
  const [appContext, setAppContext] = useState<AppStore>(null);

  useEffect(() => {

    DbContext.history.get().exec((err, doc) => {
      let mainContext = new AppStore();

      if (err) {
        console.error(err);
      } else {

        if (doc && doc.length > 0) {
          mainContext.historyRecords = doc;
          setAppContext(mainContext);
        } else {
          setAppContext(mainContext);
        }
      }
    });

    ffmpeg.setFfmpegPath(config.ffmpegPath);
  }, []);

  return (
    <AppContext.Provider value={appContext}>
      <ToastContainer />
      <Layout />
      <div id="loading-screen">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    </AppContext.Provider>
  );
}
