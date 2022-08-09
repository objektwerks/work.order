// @ts-check
import Client from './client.js';

export default class Menu {
  constructor() {
    Client.getById('login-menu-id').addEventListener('click', () => {
      this.selectLoginRegisterTab('login-pane-id')
    }, false);
    
    Client.getById('register-menu-id').addEventListener('click', () => {
      this.selectLoginRegisterTab('register-pane-id')
    }, false);
  }

  selectLoginRegisterTab(paneId) {
    let panes = Client.getByClass('login-register-pane');
    for (const pane of panes) {
      pane['style'].display = 'none';
    }
    Client.show(paneId);
  }
}