import React from 'react'
import style from './styles.module.scss';


const VideoCard = ({ video }) => {
    const { artist, img, name } = video;
    return (
        <div className={style.card}>
            <img src={img} alt={name} />
            <p className={style.video_name}>{name}</p>
            <p className={style.video_artist}>{artist}</p>
        </div>
    )
}

export default VideoCard;