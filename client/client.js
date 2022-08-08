// @ts-check
import Fetcher from './fetcher.js';

const host = '127.0.0.1';
const port = 3000;
const fetcher = new Fetcher(`http://${host}:${port}`);

console.log('*** client running ...');

// Menu
function selectLoginRegisterTab(paneId) {
  let panes = document.getElementsByClassName('login-register-pane');
  for (const pane of panes) {
    pane['style'].display = 'none';
  }
  document.getElementById(paneId).style.display = 'block';
}
document.getElementById('login-menu-id').addEventListener('click', function() {
  selectLoginRegisterTab('login-pane-id')
}, false);
document.getElementById('register-menu-id').addEventListener('click', function() {
  selectLoginRegisterTab('register-pane-id')
}, false);

// Login
document.getElementById('login-email-address-id').addEventListener('change', function() {
  // TODO
});
document.getElementById('login-pin-id').addEventListener('change', function() {
  // TODO
});
document.getElementById('login-command-id').addEventListener('click', function() {
  // TODO
}, false);

// Register
document.getElementById('register-role-id').addEventListener('change', function() {
  // TODO
});
document.getElementById('register-name-id').addEventListener('change', function() {
  // TODO
});
document.getElementById('register-email-address-id').addEventListener('change', function() {
  // TODO
});
document.getElementById('register-street-address-id').addEventListener('change', function() {
  // TODO
});
document.getElementById('register-command-id').addEventListener('click', function() {
  // TODO
}, false);