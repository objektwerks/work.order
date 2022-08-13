// @ts-check
import { getById, getByClass, show } from './common.js';

export default class Menu {
  constructor() {
    getById('login-menu-id').addEventListener('click', () => {
      this.selectMenuItem('login-view-id')
    }, false);
    
    getById('register-menu-id').addEventListener('click', () => {
      this.selectMenuItem('register-view-id')
    }, false);

    getById('workorders-menu-id').addEventListener('click', () => {
      this.selectMenuItem('workorders-view-id')
    }, false);

    getById('user-menu-id').addEventListener('click', () => {
      this.selectMenuItem('user-view-id')
    }, false);
  }

  selectMenuItem(viewId) {
    const views = getByClass('view');
    for (const view of views) {
      view['style'].display = 'none';
    }
    show(viewId);
  }
}