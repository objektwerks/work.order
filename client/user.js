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
        const user = User.create(role, name, emailAddress, streetAddress);
        const status = this.fetch(user);
        if (!status.success) {
          errors.push(status.error);
          this.listErrors(errors);
        } else {          
          show('user-info-view-id');
        }
      } else {
        this.listErrors(errors);
      }      
    }, false);
  }

  fetch(user) {
    return this.fetcher.updateUser(user);
  }

  listErrors(errors) {
    listValues('user-errors-list-id', errors);
    show('user-errors-view-id');
  }
}