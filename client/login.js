// @ts-check
import { Credentials } from './model.js';
import { getById, getValueById, hide, listValues, show } from './document.js';

export default class LoginView {
  constructor(fetcher) {
    this.fetcher = fetcher;

    getById('login-command-id').addEventListener('click', () => {
      hide('login-errors-view-id');

      const emailAddress = getValueById('login-email-address-id');
      const pin = getValueById('login-pin-id');

      const errors = Credentials.validate(emailAddress, pin);
      if (errors.length === 0) {
        const credentials = Credentials.create(emailAddress, pin);
        const userServiceProvidersWorkOrders = this.fetch(credentials);
        if (!userServiceProvidersWorkOrders.success) {
          errors.push(userServiceProvidersWorkOrders.error);
          this.listErrors(errors);
        } else {
          hide('login-view-id');
          hide('login-menu-id');

          hide('register-view-id"');
          hide('register-info-view-id');
          hide('register-menu-id');

          show('workorders-view-id');
          show(`workorders-menu-id`);
          show(`user-menu-id`);
          // TODO: Set user, service providers and workorders.
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
    show('login-errors-view-id');
  }
}