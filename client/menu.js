// @ts-check
export default class Menu {
  constructor() {
    document.getElementById('login-menu-id').addEventListener('click', () => {
      this.selectLoginRegisterTab('login-pane-id')
    }, false);
    
    document.getElementById('register-menu-id').addEventListener('click', () => {
      this.selectLoginRegisterTab('register-pane-id')
    }, false);
  }

  selectLoginRegisterTab(paneId) {
    let panes = document.getElementsByClassName('login-register-pane');
    for (const pane of panes) {
      pane['style'].display = 'none';
    }
    document.getElementById(paneId).style.display = 'block';
  }
}