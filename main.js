const { app, BrowserWindow, ipcMain, Menu, screen } = require('electron')
const path = require('path')
let show = true
app.whenReady().then(() => {
    // Menu.setApplicationMenu(null) 
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        show: true,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    const win2 = new BrowserWindow({
        width: 120, //悬浮窗口的宽度 比实际DIV的宽度要多2px 因为有1px的边框
        height: 120, //悬浮窗口的高度 比实际DIV的高度要多2px 因为有1px的边框
        frame: false,  //要创建无边框窗口
        resizable: false,
        show: true,  //先不让窗口显示
        webPreferences: {
            devTools: false //关闭调试工具
        },
        transparent: true, //设置透明
        hasShadow: false, //不显示阴影
        alwaysOnTop: true, //窗口是否总是显示在其他窗口之前
        // backgroundColor: '#eee',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    win.loadFile('main.html') //需要加载的html
    win.setProgressBar(50)
    win2.loadFile('ball.html')
    win2.on('close', () => {
        app.quit()
        
    })
    win.on('close', () => {app.quit()})
    app.on('ready', () => {
        createWindow()
        app.set
    })
    win2.setPosition(screen.getPrimaryDisplay().workAreaSize.width - 160, screen.getPrimaryDisplay().workAreaSize.height - 160)
    ipcMain.on('move-application', (event, pos) => {
        win2.setPosition(pos.posX, pos.posY)
    })
    ipcMain.on('move-main', (event, pos) => {
        win.setPosition(pos.posX, pos.posY)
    })
    ipcMain.on('exit', (event, pos) => {
        app.quit()
    })
    ipcMain.on('show', (event, pos) => {
        if(win == null){
            app.quit()
        }
        show = !show
        if (show) {
            win.hide()
        }
        else {
            win.show()
        }
    })
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
