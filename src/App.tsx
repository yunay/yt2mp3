import React, { useEffect } from 'react';
import ffmpeg from 'fluent-ffmpeg';
import './App.global.css';
import config from '../config';
import Layout from './Layout';
import { ToastContainer } from 'react-toastify';

export default function App() {
  useEffect(() => {
    ffmpeg.setFfmpegPath(config.ffmpegPath);
  }, []);

  return (
    <>
      <ToastContainer />
      <Layout />
      <div id="loading-screen">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    </>
  );
}
