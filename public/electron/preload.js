const { contextBridge, ipcRenderer } = require("electron");

const API = {
    downloadVideo: (args) => ipcRenderer.send("download", args),
    onDownloadComplete: (callback) => ipcRenderer.on("download-complete", (event, video) => callback(video)),
}

contextBridge.exposeInMainWorld("api", API);