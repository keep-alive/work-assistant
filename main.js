const { app, BrowserWindow, ipcMain, Menu } = require('electron');
let mainWindow = null;
let isMac = process.platform === 'darwin';
app.on('ready',() => {
    ipcMain.on('documents-path', (event, arg) => {
        event.returnValue = app.getPath('documents');
    })
    ipcMain.on('is-mac', (event, arg) => {
        event.returnValue = isMac;
    })
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    })
    const url = "http://localhost:3000";
    mainWindow.loadURL(url);
})