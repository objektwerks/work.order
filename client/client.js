// @ts-check
import menu from './menu.js';
import model from './model.js';
import fetcher from './fetcher.js';
import registerview from './register.view.js';
import loginview from './login.view.js';
import workordersview from './workorders.view.js';
import userview from './user.view.js';

export default () => {
  menu();
  model();
  fetcher();
  registerview();
  loginview();
  workordersview();
  userview();
  console.log('*** client running ...');
  console.log('*** server url: ' + 'https://' + window.location.host);
}