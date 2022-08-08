// @ts-check
import Fetcher from './fetcher.js';

const host = '127.0.0.1';
const port = 3000;
const fetcher = new Fetcher(`http://${host}:${port}`);

console.log('*** client running ...');

function selectLoginRegisterTab(tabId) {
  let tabs = document.getElementsByClassName("login-register-tab");
  for (const tab of tabs) {
    tab["style"].display = "none";
  }
  document.getElementById(tabId).style.display = "block";
}

document.getElementById('login-button-id').addEventListener('click', function() {
  selectLoginRegisterTab('login-tab-id')
}, false);
document.getElementById('register-button-id').addEventListener('click', function() {
  selectLoginRegisterTab('register-tab-id')
}, false);