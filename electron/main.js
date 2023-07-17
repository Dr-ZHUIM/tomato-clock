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
    width: 130,
    height: 50,
    x: 1500,
    y: 100,
    transparent: true,
    hasShadow: true,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true
    }
  })

  mainWindow.setAspectRatio(1)
  // and load the index.html of the app.
  if (mode === 'dev') {
    mainWindow.loadURL('http://localhost:8080/')
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(productURL)
  }
  mainWindow.setSkipTaskbar(true)
  mainWindow.setAlwaysOnTop(true, 'screen-saver')
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
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
  Menu.setApplicationMenu(contextMenu)
  tray = new Tray(path.join(__dirname, '../public/icon.ico'))
  tray.addListener('click', () => {
    mainWindow.showInactive()
  })
  tray.setToolTip('tomato-clock - MILLIERANNA is Watching')
  tray.setContextMenu(contextMenu)
  ipcMain.on('menu-commands', (event, input) => {
    if (input === 'request-menu') {
      contextMenu.popup({ window: BrowserWindow.fromWebContents(event.sender) })
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
