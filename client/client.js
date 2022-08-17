// @ts-check
import menu from './menu.js';
import model from './model.js';
import fetcher from './fetcher.js';
import registerview from './register.view.js';
import loginview from './login.view.js';
import workordersview from './workorders.view.js';
import UserView from './user.view.js';

export default () => {
  menu();
  model();
  fetcher();
  registerview();
  loginview();
  workordersview();
  const userView = new UserView();
  console.log('*** client running, with root url: ' + 'https://' + window.location.host);
}