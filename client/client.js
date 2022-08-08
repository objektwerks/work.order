// @ts-check
import Menu from './menu.js';
import Fetcher from './fetcher.js';
import Login from './login.js';
import Register from './register.js';

const fetcher = new Fetcher(`http://127.0.0.1:3000`);
const menu = new Menu();
const login = new Login(fetcher);
const register = new Register(fetcher);

console.log('*** client running ...');