// @ts-check
import menu from './menu.js';
import model from './model.js';
import Fetcher from './fetcher.js';
import LoginView from './login.view.js';
import RegisterView from './register.view.js';
import WorkOrdersView from './workorders.view.js';
import UserView from './user.view.js';

export default class Client {
  constructor() {
    menu();
    model();
    this.fetcher = new Fetcher();
    this.loginView = new LoginView(this.fetcher);
    this.registerView = new RegisterView(this.fetcher);
    this.workordersView = new WorkOrdersView(this.fetcher);
    this.userView = new UserView(this.fetcher);
    console.log('*** client running, with root url: ' + 'https://' + window.location.host);
  }
}