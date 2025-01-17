const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    submitVideo: (filePath) => {
        ipcRenderer.send("video:submit", filePath);
    },
    receiveVideoMetadata: (onMetadataReceived) => {
        ipcRenderer.on('video:duration', (event, duration) => {
            onMetadataReceived(duration);
        });
    }
});
