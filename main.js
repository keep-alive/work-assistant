const { app, BrowserWindow, ipcMain } = require('electron');
let mainWindow = null;
app.on('ready',() => {
    ipcMain.on('documents-path', (event, arg) => {
        event.returnValue = app.getPath('documents');
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