import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MusicCard from '../../components/MusicCard';
import axiosInstance from '../../redux/axiosInstance';
import style from './style.module.scss'
import { setCurrentSong } from '../../redux/audioPlayer';

const Musics = () => {
    const [musics, setMusics] = useState([]);
    const { currentSong } = useSelector((state) => state.audioPlayer);
    const dispatch = useDispatch();
    useEffect(() => {
        axiosInstance.get("/songs").then(response => setMusics(response.data.data));
    }, [])

    function handleClickMusic(music) {
        const payload = {
            song: music,
            action: "play",
        };
        dispatch(setCurrentSong(payload));
    }

    return (
        <section className={style.container}>
            <div className={style.heading}>
                <h2>Músicas</h2>
                <span>{musics.length} músicas</span>
            </div>
            <div className={style.videos_container}>
                {musics.map((music) => <MusicCard key={music._id} music={music} onClick={handleClickMusic} />)}
            </div>
        </section>
    )
}

export default Musics;