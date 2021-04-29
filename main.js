const { app, BrowserWindow } = require('electron');
let mainWindow = null;
app.on('ready',() => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webPreferences: {
            nodeIntegration: true
        }
    })
    const url = "http://localhost:3000";
    mainWindow.loadURL(url);
})