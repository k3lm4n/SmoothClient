import React from 'react'
import style from './styles.module.scss';

const MusicCard = ({ music, onClick }) => {
    const { artist, img, name, song } = music;
    return (
        <div className={style.card} onClick={() => onClick(music)}>
            <img src={img} alt={name} />
            <p className={style.video_name}>{name}</p>
            <p className={style.video_artist}>{artist}</p>
        </div>
    )
}

export default MusicCard;