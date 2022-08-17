// @ts-check
import Menu from './menu.js';
import Model from './model.js';
import Fetcher from './fetcher.js';
import LoginView from './login.view.js';
import RegisterView from './register.view.js';
import WorkOrdersView from './workorders.view.js';
import UserView from './user.view.js';

export default class Client {
  constructor() {
    this.menu = new Menu();
    this.model = new Model();
    this.fetcher = new Fetcher();
    this.loginView = new LoginView(this.fetcher, this.model);
    this.registerView = new RegisterView(this.fetcher);
    this.workordersView = new WorkOrdersView(this.fetcher, this.model);
    this.userView = new UserView(this.fetcher, this.model);
    console.log('*** client running, with root url: ' + 'https://' + window.location.host);
  }
}