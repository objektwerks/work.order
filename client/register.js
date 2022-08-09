// @ts-check
import { Registration } from "./model.js";

export default class Register {
  constructor(fetcher) {
    this.fetcher = fetcher;

    document.getElementById('register-command-id').addEventListener('click', () => {
      const role =  document.getElementById('register-role-id')['role'];
      const name =  document.getElementById('register-name-id')['value'];
      const emailAddress =  document.getElementById('register-email-address-id')['value'];
      const streetAddress =  document.getElementById('register-street-address-id')['value'];

      Registration.validate(role, name, emailAddress, streetAddress);
      const registration = Registration.create(role, name, emailAddress, streetAddress);

      const status = this.fetch(registration);
      console.log('register -> status: ', status);
      // TODO: Set UI
    }, false);
  }

  async fetch(registration) {
    return await this.fetcher.register(registration);
  }
}