const path = require("path");

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { download } = require("electron-dl");
const isDev = require("electron-is-dev");

const DEV_URL = "http://localhost:3000"
const PROD_URL = `file://${path.join(__dirname, "../../index.html")}`

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js"),
        },
        show: false,
    });

    win.loadURL(isDev ? DEV_URL : PROD_URL);
    win.on("ready-to-show", win.show);

    ipcMain.on("download", async (event, args) => {
        const { url, filename } = args;
        const defaultPath = app.getPath("videos");
        const { filePath } = await dialog.showSaveDialog({
            defaultPath: `${defaultPath}/${filename}`,
        });

        if (filePath) {
            const path = filePath.split("/");
            path.pop();
            const directory = path.join("/");
            await download(BrowserWindow.getFocusedWindow(), url, {
                filename,
                showBadge: true,
                directory,
                onCompleted: (item) => {
                    win.webContents.send("download-complete", item);
                }
            })
        }
    })
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

