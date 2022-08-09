// @ts-check
import { Credentials } from './model.js';
import Client from './client.js';

export default class Login {
  constructor(fetcher) {
    this.fetcher = fetcher;

    document.getElementById('login-command-id').addEventListener('click', () => {
      Client.hide('login-errors-pane-id');

      const emailAddress = document.getElementById('login-email-address-id')['value'];
      const pin = document.getElementById('login-pin-id')['value']

      const errors = Credentials.validate(emailAddress, pin);
      if (errors.length === 0) {
        const credentials = Credentials.create(emailAddress, pin);
        const userWorkOrders = this.fetch(credentials);
        console.log('login -> userWorkOrders: ', userWorkOrders);
        if (!userWorkOrders.success) {
          errors.push(userWorkOrders.error);
          this.listErrors(errors);
        } else {
          // TODO: Set user and work orders forms.
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
    Client.listValues('login-errors-list-id', errors);
    Client.show('login-errors-pane-id');
  }
}