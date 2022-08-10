// @ts-check
import { getById, getByClass, show } from './document.js';

export default class Menu {
  constructor() {
    getById('login-menu-id').addEventListener('click', () => {
      this.selectTab('login-pane-id')
    }, false);
    
    getById('register-menu-id').addEventListener('click', () => {
      this.selectTab('register-pane-id')
    }, false);

    getById('workorders-menu-id').addEventListener('click', () => {
      this.selectTab('workorders-pane-id')
    }, false);

    getById('user-menu-id').addEventListener('click', () => {
      this.selectTab('user-pane-id')
    }, false);
  }

  selectTab(paneId) {
    const panes = getByClass('model-pane');
    for (const pane of panes) {
      pane['style'].display = 'none';
    }
    show(paneId);
  }
}