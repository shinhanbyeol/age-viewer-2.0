import path from 'path';
import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

// program imports for age viewer
import AppDatabase from './data/sqliteInstance';
import MainController from './controller/ipcMainController';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`);
});

/********************************************
 * @description age viewer ipcMain start point
 *
 ********************************************/

// app database path init
const sqlitePath = isProd
  ? path.join(app.getPath('userData'), 'age.sqlite')
  : path.join('./userData', 'age.dev.sqlite');

// cache path init
const cachePath = isProd
  ? path.join(app.getPath('userData'), 'cache')
  : path.join('./userData', 'cache');

// create app database instance
const appData = new AppDatabase(sqlitePath).appData;
const mainController = new MainController(appData, app, cachePath);