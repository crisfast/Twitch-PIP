const electron = require('electron')
const {BrowserWindow, app, ipcMain} = electron
var path = require('path')

let mainWindow = null;
let win = null

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
});

app.on('ready', function() {

  mainWindow = new BrowserWindow({width: 800, height: 800, minWidth: 400, minHeight: 300, icon: path.join(__dirname, 'screen65')})
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  mainWindow.on('closed', function() {
    mainWindow = null
    if(mainWindow != null) win.close()
  });

});

ipcMain.on('synchronous-message', (event,arg) => {
    win = new BrowserWindow({width: 400,
    height: 300,
    center: true,
    alwaysOnTop: true,
    title: "Twitch Player"
    })

    win.loadURL(arg)
    mainWindow.minimize()

  win.on('closed', function() {
    win = null
    if(win != null) mainWindow.restore()
  });

  mainWindow.on('restore',() => {
    mainWindow.loadURL('file://' + __dirname + '/index.html')
  })
})
