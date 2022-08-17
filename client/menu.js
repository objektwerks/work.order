// @ts-check
import { getById, getByClass, show } from './common.js';

export default () => {
  getById('login-menu-id').addEventListener('click', () => {
    selectMenuItem('login-view-id')
  }, false);
  
  getById('register-menu-id').addEventListener('click', () => {
    selectMenuItem('register-view-id')
  }, false);
  
  getById('workorders-menu-id').addEventListener('click', () => {
    selectMenuItem('workorders-view-id')
  }, false);
  
  getById('user-menu-id').addEventListener('click', () => {
    selectMenuItem('user-view-id')
  }, false);

  console.log('*** menu init ...');
}

function selectMenuItem(viewId) {
  const views = getByClass('view');
  for (const view of views) {
    view['style'].display = 'none';
  }
  show(viewId);
}