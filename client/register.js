// @ts-check
import { getById, getValueById, hide, listValues, show } from './document.js';

// @ts-ignore
import { Registration } from "./entity.js";

// @ts-ignore
import { validateRegistration } from './validator.js';

export default class RegisterView {
  constructor(fetcher) {
    this.fetcher = fetcher;

    getById('register-command-id').addEventListener('click', () => {
      hide('register-errors-view-id');

      const role = getValueById('register-role-id');
      const name = getValueById('register-name-id');
      const emailAddress = getValueById('register-email-address-id');
      const streetAddress = getValueById('register-street-address-id');

      const errors = validateRegistration(role, name, emailAddress, streetAddress);
      if (errors.length === 0) {
        const registration = Registration.create(role, name, emailAddress, streetAddress);
        const status = this.fetch(registration);
        if (!status.success) {
          errors.push(status.error);
          this.listErrors(errors);
        } else {
          hide('register-view-id"');
          hide('register-menu-id');
          
          show('register-info-view-id');
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
    listValues('register-errors-list-id', errors);
    show('register-errors-view-id');
  }
}