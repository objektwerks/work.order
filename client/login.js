// @ts-check
import { Credentials } from './model.js';
import Client from './client.js';

export default class Login {
  constructor(fetcher) {
    this.fetcher = fetcher;

    document.getElementById('login-command-id').addEventListener('click', () => {
      document.getElementById('login-errors-pane-id').style.display = 'none';

      const emailAddress = document.getElementById('login-email-address-id')['value'];
      const pin = document.getElementById('login-pin-id')['value']

      const errors = Credentials.validate(emailAddress, pin);
      if (errors.length === 0) {
        const credentials = Credentials.create(emailAddress, pin);
        const userWorkOrders = this.fetch(credentials);
        console.log('login -> userWorkOrders: ', userWorkOrders);
        // TODO: Check success/fail and set user and work orders forms as required.
      } else {
        Client.addToList('login-errors-list-id', errors);
        document.getElementById('login-errors-pane-id').style.display = 'block';
      }
    }, false);
  }

  fetch(credentials) {
    return this.fetcher.login(credentials);
  }
}