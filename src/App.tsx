import React, { useEffect } from 'react';
import ffmpeg from 'fluent-ffmpeg';
import './App.global.css';
import config from '../config';
import Layout from './Layout';

export default function App() {

  useEffect(() => {
    ffmpeg.setFfmpegPath(config.ffmpegPath);
  }, [])

  return <Layout />;
}
