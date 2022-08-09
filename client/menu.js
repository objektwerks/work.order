// @ts-check
import { getById, getByClass, show } from './client.js';

export default class Menu {
  constructor() {
    getById('login-menu-id').addEventListener('click', () => {
      this.selectLoginRegisterTab('login-pane-id')
    }, false);
    
    getById('register-menu-id').addEventListener('click', () => {
      this.selectLoginRegisterTab('register-pane-id')
    }, false);
  }

  selectLoginRegisterTab(paneId) {
    let panes = getByClass('login-register-pane');
    for (const pane of panes) {
      pane['style'].display = 'none';
    }
    show(paneId);
  }
}