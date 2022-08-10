// @ts-check
import Fetcher from './fetcher.js';
import Menu from './menu.js';
import LoginPane from './login.js';
import RegisterPane from './register.js';
import WorkOrdersPane from './workorders.js';
import UserPane from './user.js';

export default class Client {
  constructor(url) {
    this.url = url;
    this.fetcher = new Fetcher(this.url);
    this.menu = new Menu();
    this.loginpane = new LoginPane(this.fetcher);
    this.registerpane = new RegisterPane(this.fetcher);
    this.workorderspane = new WorkOrdersPane(this.fetcher);
    this.userpane = new UserPane(this.fetcher);
    console.log('*** client running ...');
  }
}