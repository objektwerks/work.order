// @ts-check
import { Credentials } from './model.js';

export default class Login {
  constructor(fetcher) {
    this.fetcher = fetcher;

    document.getElementById('login-command-id').addEventListener('click', () => {
      const emailAddress = document.getElementById('login-email-address-id')['value'];
      const pin = document.getElementById('login-pin-id')['value']

      const errors = Credentials.validate(emailAddress, pin);
      if (errors.length === 0) {
        const credentials = Credentials.create(emailAddress, pin);
        const userWorkOrders = this.fetch(credentials);
        console.log('login -> userWorkOrders: ', userWorkOrders);
        // TODO: Set UI
      } else {
        // TODO: Set errors on login-errors-list-id
      }
    }, false);
  }

  async fetch(credentials) {
    return await this.fetcher.login(credentials);
  }
}