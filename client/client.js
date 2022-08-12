// @ts-check
import Fetcher from './fetcher.js';
import Model from './model.js';
import Menu from './menu.js';
import LoginView from './login.js';
import RegisterView from './register.js';
import WorkOrdersView from './workorders.js';
import UserView from './user.js';

// @ts-ignore
import now from './now.js';
now('client');

export default class Client {
  constructor(url) {
    this.url = url;
    this.fetcher = new Fetcher(this.url);
    this.model = new Model();
    this.menu = new Menu();
    this.loginpane = new LoginView(this.fetcher, this.model);
    this.registerpane = new RegisterView(this.fetcher);
    this.workorderspane = new WorkOrdersView(this.fetcher, this.model);
    this.userpane = new UserView(this.fetcher, this.model);
    console.log('*** client running ...');
  }
}