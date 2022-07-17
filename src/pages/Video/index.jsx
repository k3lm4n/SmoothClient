import "video-react/dist/video-react.css";
import { Player, BigPlayButton } from 'video-react';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from './style.module.scss';
import axiosInstance from "../../redux/axiosInstance";
import DownloadIcon from '@mui/icons-material/Download';
import videoStorage from '../../videoStorage';

const Video = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/videos/${id}`).then((data) => setVideo(data.data.data));
  }, [id]);

  if (!video) {
    return <span className={style.loading}>Loading...</span>
  }

  function onDownloadVideo(e) {
    e.preventDefault();
    const filename = video.name + ".mp4";
    window.api.downloadVideo({
      url: video.video,
      filename,
    });

    window.api.onDownloadComplete((video) => {
      alert("Download Complete");
      videoStorage.addVideo(video);
    })
  }

  return <div className={style.container}>
    <Player src={video.video} >
      <BigPlayButton position="center" />
    </Player>
    <div className={style.metadata}>
      <div>
        <p className={style.video_name}>{video.name}</p>
        <p className={style.video_artist}>{video.artist}</p>
      </div>
      <button onClick={onDownloadVideo} >Download <DownloadIcon /></button>
    </div>
  </div>;
};

export default Video;
