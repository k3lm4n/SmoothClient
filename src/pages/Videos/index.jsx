import React from 'react'
import { useSelector } from 'react-redux';

const Videos = () => {
    const { videos } = useSelector((state) => state.videos);
    console.log(videos);
    return (
        <div>Videos</div>
    )
}

export default Videos;