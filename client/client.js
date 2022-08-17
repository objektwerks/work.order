// @ts-check
import menu from './menu.js';
import model from './model.js';
import fetcher from './fetcher.js';
import LoginView from './login.view.js';
import RegisterView from './register.view.js';
import WorkOrdersView from './workorders.view.js';
import UserView from './user.view.js';

export default class Client {
  constructor() {
    menu();
    model();
    fetcher();
    this.loginView = new LoginView();
    this.registerView = new RegisterView();
    this.workordersView = new WorkOrdersView();
    this.userView = new UserView();
    console.log('*** client running, with root url: ' + 'https://' + window.location.host);
  }
}