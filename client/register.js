// @ts-check
import { Registration } from "./model.js";

export default class Register {
  constructor(fetcher) {
    this.fetcher = fetcher;

    document.getElementById('register-command-id').addEventListener('click', () => {
      const role =  document.getElementById('register-role-id')['value'];
      const name =  document.getElementById('register-name-id')['value'];
      const emailAddress =  document.getElementById('register-email-address-id')['value'];
      const streetAddress =  document.getElementById('register-street-address-id')['value'];

      const errors = Registration.validate(role, name, emailAddress, streetAddress);
      if (errors.length === 0) {
        const registration = Registration.create(role, name, emailAddress, streetAddress);
        const status = this.fetch(registration);
        console.log('register -> status: ', status);
        // TODO: Set UI
      } else {
        // TODO: Set errors on register-errors-list-id 
      }

    }, false);
  }

  async fetch(registration) {
    return await this.fetcher.register(registration);
  }
}