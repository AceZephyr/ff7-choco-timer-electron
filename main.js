const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const sqlite3 = require("sqlite3");

async function query(event, query) {
    const db = new sqlite3.Database('choco.db');
    console.log(query)
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        });
    });
}

async function error(event, content) {
    console.log("Alert:")
    console.log(content)
    return dialog.showErrorBox("ChocoTimer", content)
}

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index2.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    ipcMain.handle('query', query);
    ipcMain.handle('error', error)
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
