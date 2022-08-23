// @ts-check
import menu from './menu.js';
import model from './model.js';
import fetcher from './fetcher.js';
import registerview from './register.form.js';
import loginview from './login.form.js';
import workordersview from './workorders.view.js';
import userview from './user.form.js';

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