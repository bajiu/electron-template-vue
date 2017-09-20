import { app,BrowserWindow } from 'electron';
import is from 'electron-is';
import { join } from 'path';
import log from 'electron-log';
import * as application from './services/application';
import * as window from './services/window';
import * as menu from './services/menu';
import * as config from './configs/config';




log.transports.file.level = 'info';

log.info('(main/index) ============无敌分割线==========================================================');
log.info('(main/index) app start');

if (is.dev()) {
  require('electron-debug')();
}


app.on('ready', () => {
  log.info("app is ready")
  let mainWin = application.init();
  is.dev() && mainWin.openDevTools()
  menu.init();
})




app.on('activate', () => {
  (window.getCount() === 0) && application.init();

});


app.on('window-all-closed', () => {
  app.quit()
})

app.on('quit', () => {
  log.info('(main/index) app quit');
  log.info('(main/index) ===========================无敌分割线=========================================');
});



// Register to global, so renderer can access these with remote.getGlobal
global.services = {
  application,
  window,
};
global.configs = {
  config,
};






//
