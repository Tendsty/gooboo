const { app, BrowserWindow, shell } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1080,
    height: 720,
    icon: 'dist/favicon.ico'
  })

  win.loadFile('dist/index.html')
  win.removeMenu()
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
