const {app, BrowserWindow, session, Menu} = require('electron')
const os = require('os')

const createWindow = () => {
  Menu.setApplicationMenu(false)
  var win = new BrowserWindow({
      center: true,
      resizable: true,
      title: "YouTube Desktop",
      darkTheme: true,
      frame: true,
      titleBarStyle: false,
      webPreferences:{
          nodeIntegration: false,
          show: false
      }
  });
  session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
    if(permission === 'notifications') {
      callback(true)
    }
  });
  win.loadURL('https://www.youtube.com/', {userAgent: `Mozilla/5.0 (${getOS()}) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36`})
}
app.on('ready', createWindow);
function getOS() {
  var osType = os.type()
  var osVersion

  switch (osType) {
      case 'Windows_NT':
          var nt_version = os.release().split('.')[0] + '.' + os.release().split('.')[1]
          osVersion = `Window NT ${nt_version}; ${(os.arch == 'x64' ? `Win64; x64` : `Win86; x86`)}`
          break;
      case 'Linux':
          osVersion = `X11; Linux ${(os.arch == "x64" ? `x86_x64` : `x86`)}`
          break;
      case 'Darwin':
              osVersion = `Macintosh; Mac OS X ${os.release().split(',')[0]}.${os.release().split(',')[1]}`
          break;
      default:
          break;
  }

  return osVersion
}