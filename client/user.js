// @ts-check
import { getById, getValueById, hide, listValues, show } from './document.js';

// @ts-ignore
import { validateUser } from './validator.js';

// @ts-ignore
import { User } from './entity.js';

export default class UserView {
  constructor(fetcher, model) {
    this.fetcher = fetcher;
    this.model = model;

    getById('user-save-command-id').addEventListener('click', () => {
      hide('user-errors-view-id');

      const role = getValueById('user-role-id');
      const name = getValueById('user-name-id');
      const emailAddress = getValueById('user-email-address-id');
      const streetAddress = getValueById('user-street-address-id');
      const errors = validateUser(role, name, emailAddress, streetAddress);
      
      if (errors.length === 0) {
        const registration = User.create(role, name, emailAddress, streetAddress);
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