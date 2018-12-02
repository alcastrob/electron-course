const electron = require('electron');

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    //If the main window is closed, close also all the modal that could be opened.
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo'
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
    //To prevent the propagation of the menu of the main window to this one.
    addWindow.setMenu(null);
    //For memory management.
    addWindow.on('closed', () => addWindow = null);
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

const menuTemplate = [{
    label: 'File',
    submenu: [
        { 
            label: 'New Todo',
            click() {
                createAddWindow();
            }
        },
        {
            label: 'Clear Todos',
            click() {
                mainWindow.webContents.send('todo:clear');
            }
        },
        {
            label: 'Quit', 
            accelerator: process.platform === 'darwing' ? 'Command+Q' : 'Ctrl+Q',
            click() {
                app.quit();
            }
        }
    ]
}];

// due to OSX way of render menus, you must leave an empty element to make your app interoperable
if (process.platform === 'darwin') {
    menuTemplate.unshift({})
}

if (process.env.NODE_ENV !== 'production'){
    // 'production', 'staging', 'development', 'test'
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwing' ? 'Command+Alt+I' : 'F12',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
                //For reloading the full page inside the window
            }
        ]
    })
}