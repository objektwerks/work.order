// @ts-check
import { Registration } from "./model.js";
import Client from './client.js';

export default class Register {
  constructor(fetcher) {
    this.fetcher = fetcher;

    document.getElementById('register-command-id').addEventListener('click', () => {
      document.getElementById('register-errors-pane-id').style.display = 'none';

      const role = document.getElementById('register-role-id')['value'];
      const name = document.getElementById('register-name-id')['value'];
      const emailAddress = document.getElementById('register-email-address-id')['value'];
      const streetAddress = document.getElementById('register-street-address-id')['value'];

      const errors = Registration.validate(role, name, emailAddress, streetAddress);
      if (errors.length === 0) {
        const registration = Registration.create(role, name, emailAddress, streetAddress);
        const status = this.fetch(registration);
        console.log('register -> status: ', status);
        // TODO: check status and set errors if required.
      } else {
        Client.addToList('register-errors-list-id', errors);
        document.getElementById('register-errors-pane-id').style.display = 'block';
      }
    }, false);
  }

  fetch(registration) {
    return this.fetcher.register(registration);
  }
}