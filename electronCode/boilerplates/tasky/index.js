const electron = require('electron');
const path = require('path');
const TimerTray = require('./app/timer_tray');

const {
    app,
    BrowserWindow
} = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false
    });
    if (process.platform === 'darwing') {
        app.dock.hide();
    } else {
        mainWindow.setSkipTaskbar(true);
    }
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    mainWindow.on('blur', () => {
        mainWindow.hide();
    });

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    //tray = new Tray(iconPath);
    new TimerTray(iconPath, mainWindow);
});