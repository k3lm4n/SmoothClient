function addVideo(path) {
    const videos = getVideos();
    localStorage.setItem("storedVideos", JSON.stringify([...videos, path]));
}

function getVideos() {
    const stringData = localStorage.getItem("storedVideos");
    return stringData ? JSON.parse(stringData) : [];
}

export default { addVideo, getVideos }