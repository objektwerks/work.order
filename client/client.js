// @ts-check
import Fetcher from './fetcher.js';
import Menu from './menu.js';
import LoginView from './login.js';
import RegisterView from './register.js';
import WorkOrdersView from './workorders.js';
import UserView from './user.js';

export default class Client {
  constructor(url) {
    this.url = url;
    this.fetcher = new Fetcher(this.url);
    this.menu = new Menu();
    this.loginpane = new LoginView(this.fetcher);
    this.registerpane = new RegisterView(this.fetcher);
    this.workorderspane = new WorkOrdersView(this.fetcher);
    this.userpane = new UserView(this.fetcher);
    console.log('*** client running ...');
  }
}