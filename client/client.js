// @ts-check
import menu from './menu.js';
import model from './model.js';
import fetcher from './fetcher.js';
import LoginView from './login.view.js';
import RegisterView from './register.view.js';
import WorkOrdersView from './workorders.view.js';
import UserView from './user.view.js';

export default () => {
  menu();
  model();
  fetcher();
  const loginView = new LoginView();
  const registerView = new RegisterView();
  const workordersView = new WorkOrdersView();
  const userView = new UserView();
  console.log('*** client running, with root url: ' + 'https://' + window.location.host);
}