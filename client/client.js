// @ts-check
import Menu from './menu.js';
import Fetcher from './fetcher.js';
import Login from './login.js';
import Register from './register.js';

export default class Client {
  constructor(url) {
    this.url = url;
    this.fetcher = new Fetcher(this.url);
    this.menu = new Menu();
    this.login = new Login(this.fetcher);
    this.register = new Register(this.fetcher);
    console.log('*** client running ...');
  }
}