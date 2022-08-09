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

  static getById(id) {
    document.getElementById(id);
  }

  static getByClass(name) {
    document.getElementsByClassName(name);
  }

  static hide(id) {
    document.getElementById(id).style.display = 'none';
  }

  static show(id) {
    document.getElementById(id).style.display = 'block';
  }

  static listValues(listId, values) {
    document.getElementById(listId).innerHTML = '';
    const ul = document.getElementById(listId);
    for (const value of values) {
      let li = document.createElement('li');
      li.appendChild(document.createTextNode(value));
      ul.appendChild(li);
    }
  }
}