const path = require("path");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

const DEV_URL = "http://localhost:3000"
const PROD_URL = `file://${path.join(__dirname, "../../index.html")}`

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    win.loadURL(isDev ? DEV_URL : PROD_URL);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length == 0) {
        createWindow();
    }
})
