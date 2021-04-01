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
  const mainContext = new AppStore();

  useEffect(() => {

    DbContext.history.get().exec((err, doc) => {

      if (err) {
        console.error(err);
      } else {

        if (doc && doc.length > 0) {
          mainContext.historyRecords = doc;
        }

        setAppContext(mainContext);
      }
    });

    DbContext.settings.get().exec((err,doc)=>{
      if (err) {
        console.error(err);
      } else {

        if (doc && doc.length > 0) {
          mainContext.settings = doc[0];
        } else{
          mainContext.settings = DbContext.settings.init();
        }

        setAppContext(mainContext);
      }

    })

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
