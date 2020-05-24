require('electron-reload')(__dirname)
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'login.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()
  win.on('closed', () => {
      win = null
  })
  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
            submenu: [
            {label:'Adjust Notification Value'},
            {label:'CoinMarketCap',
            click() { 
                shell.openExternal('http://coinmarketcap.com')
            },
            accelerator: 'CmdOrCtrl+Shift+C'},
            {type:'separator'}, 
            {
                label:'Exit', 
                click() { 
                    app.quit() 
                } 
            }
        ]
    },
    {
        label: 'Info'
    }
  ]) 
   Menu.setApplicationMenu(menu); 
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})