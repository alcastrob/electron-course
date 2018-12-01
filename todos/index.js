const electron = require('electron');

const {
    app,
    BrowserWindow,
    Menu
} = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const menuTemplate = [{
    label: 'File',
    submenu: [{
            label: 'Submenu'
        },
        {
            label: 'Quit'
        }
    ]
}];

// due to OSX way of render menus, you must leave an empty element to make your app interoperable
if (process.platform === 'darwin') {
    menuTemplate.unshift({})
}