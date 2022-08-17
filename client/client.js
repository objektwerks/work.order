// @ts-check
import menu from './menu.js';
import model from './model.js';
import fetcher from './fetcher.js';
import registerview from './register.view.js';
import LoginView from './login.view.js';
import WorkOrdersView from './workorders.view.js';
import UserView from './user.view.js';

export default () => {
  menu();
  model();
  fetcher();
  registerview();

  const loginView = new LoginView();
  const workordersView = new WorkOrdersView();
  const userView = new UserView();
  console.log('*** client running, with root url: ' + 'https://' + window.location.host);
}