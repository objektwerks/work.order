// @ts-check
import Menu from './menu.js';
import Fetcher from './fetcher.js';

const host = '127.0.0.1';
const port = 3000;
const fetcher = new Fetcher(`http://${host}:${port}`);

const menu = new Menu();

console.log('*** client running ...');


// Login
document.getElementById('login-command-id').addEventListener('click', function() {
  // get form values
  // validate form values
  // package form values
  // call fetcher
  // handle fetcher return value vis-a-vis UI
}, false);

// Register
document.getElementById('register-command-id').addEventListener('click', function() {
  // get form values
  // validate form values
  // package form values
  // call fetcher
  // handle fetcher return value vis-a-vis UI
}, false);