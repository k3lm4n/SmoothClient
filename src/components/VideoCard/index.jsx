import React from 'react'
import { Link } from 'react-router-dom';
import style from './styles.module.scss';


const VideoCard = ({ video }) => {
    const { artist, img, name, _id } = video;
    return (
        <div className={style.card}>
            <Link to={`/videos/${_id}`}>
                <img src={img} alt={name} />
                <p className={style.video_name}>{name}</p>
                <p className={style.video_artist}>{artist}</p>
            </Link>
        </div>
    )
}

export default VideoCard;