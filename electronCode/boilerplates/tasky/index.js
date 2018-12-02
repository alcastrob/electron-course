const electron = require('electron');
const path = require('path');
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

const {
    app
} = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    //tray = new Tray(iconPath);
    new TimerTray(iconPath, mainWindow);
});