const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron')
const path = require('path')
const mode = process.argv[2]
const context_menu = require('./menu')

const productURL = path.join(__dirname, '../build/index.html')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
let tray = null
app.whenReady().then(() => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 100,
    height: 150,
    x: 1200,
    y: 100,
    transparent: true,
    hasShadow: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true
    }
  })

  mainWindow.setAspectRatio(1)
  Menu.setApplicationMenu(context_menu)
  // and load the index.html of the app.
  if (mode === 'dev') {
    mainWindow.loadURL('http://localhost:8080/')
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(productURL)
  }

  mainWindow.setSkipTaskbar(true)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '重置',
      click: () => {
        mainWindow.webContents.send('menu-commands', 'reset')
      }
    },
    {
      label: '关闭',
      click: () => {
        mainWindow.destroy()
        app.quit()
      }
    }
  ])
  tray = new Tray(path.join(__dirname, '../public/icon.ico'))
  tray.setToolTip('tomato-clock - MILLIERANNA is Watching')
  tray.setContextMenu(contextMenu)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
