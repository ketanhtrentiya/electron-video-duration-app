const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const path = require('path');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // mainWindow.loadFile('./index.html');
});

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    event.sender.send("video:duration", metadata.format.duration);
  });
});
