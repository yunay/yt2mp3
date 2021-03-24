import React, { useEffect, useState } from 'react';
import ffmpeg from 'fluent-ffmpeg';
import './App.global.css';
import config from '../config';
import Layout from './Layout';
import { ToastContainer } from 'react-toastify';
import { DbContext } from './data/database';
import { AppContext, AppData } from './AppContext';

export default function App() {
  const [appContext, setAppContext] = useState<AppData>(null);

  useEffect(() => {

    DbContext.history.get().exec((err, doc) => {
      if (err) {
        console.error(err);
      } else {
        if (doc && doc.length > 0) {
          let mainContext = new AppData();
          mainContext.historyRecords = doc;
          setAppContext(mainContext);
        } else {
          setAppContext(null);
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
