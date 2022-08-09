// @ts-check
import { Registration } from "./model.js";
import Client from './client.js';

export default class Register {
  constructor(fetcher) {
    this.fetcher = fetcher;

    Client.getById('register-command-id').addEventListener('click', () => {
      Client.hide('register-errors-pane-id');

      const role = Client.getById('register-role-id')['value'];
      const name = Client.getById('register-name-id')['value'];
      const emailAddress = Client.getById('register-email-address-id')['value'];
      const streetAddress = Client.getById('register-street-address-id')['value'];

      const errors = Registration.validate(role, name, emailAddress, streetAddress);
      if (errors.length === 0) {
        const registration = Registration.create(role, name, emailAddress, streetAddress);
        const status = this.fetch(registration);
        console.log('register -> status: ', status);
        if (!status.success) {
          errors.push(status.error);
          this.listErrors(errors);
        }
      } else {
        this.listErrors(errors);
      }
    }, false);
  }

  fetch(registration) {
    return this.fetcher.register(registration);
  }

  listErrors(errors) {
    Client.listValues('register-errors-list-id', errors);
    Client.show('register-errors-pane-id');
  }
}