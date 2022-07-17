import React from 'react'
import { useSelector } from 'react-redux';
import VideoCard from '../../components/VideoCard';
import style from './style.module.scss';

const Videos = () => {
    const { videos } = useSelector((state) => state.videos);

    return (
        <section className={style.container}>
            <div className={style.heading}>
                <h2>Videos</h2>
                <span>{videos.length} vídeos</span>
            </div>
            <div className={style.videos_container}>
                {videos.map((video) => <VideoCard key={video._id} video={video} />)}
            </div>
        </section>
    )
}

export default Videos;