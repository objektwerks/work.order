// @ts-check
import { Credentials } from './model.js';
import { getById, getValueById, hide, listValues, show } from './document.js';

export default class LoginView {
  constructor(fetcher) {
    this.fetcher = fetcher;

    getById('login-command-id').addEventListener('click', () => {
      hide('login-errors-pane-id');

      const emailAddress = getValueById('login-email-address-id');
      const pin = getValueById('login-pin-id');

      const errors = Credentials.validate(emailAddress, pin);
      if (errors.length === 0) {
        const credentials = Credentials.create(emailAddress, pin);
        const userWorkOrders = this.fetch(credentials);
        if (!userWorkOrders.success) {
          errors.push(userWorkOrders.error);
          this.listErrors(errors);
        } else {
          hide('login-pane-id');
          hide('login-menu-id');

          hide('register-pane-id"');
          hide('register-info-pane-id');
          hide('register-menu-id');

          show('workorders-pane-id');
          show(`workorders-menu-id`);
          show(`user-menu-id`);
          // TODO: Set service providers and workorder-subpane-id as required.
        }
      } else {
        this.listErrors(errors);
      }
    }, false);
  }

  fetch(credentials) {
    return this.fetcher.login(credentials);
  }

  listErrors(errors) {
    listValues('login-errors-list-id', errors);
    show('login-errors-pane-id');
  }
}