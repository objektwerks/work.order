// @ts-check
import { getById, getValueById, hide, listValues, show } from './document.js';

// @ts-ignore
import { validateUserView } from './validator.js';

export default class UserView {
  constructor(fetcher, model) {
    this.fetcher = fetcher;
    this.model = model;

    getById('user-save-command-id').addEventListener('click', () => {
      hide('user-errors-view-id');

      const name = getValueById('user-name-id');
      const emailAddress = getValueById('user-email-address-id');
      const streetAddress = getValueById('user-street-address-id');

      const errors = validateUserView(name, emailAddress, streetAddress);
      if (errors.length === 0) {
        model.name = name;
        model.emailAddress = emailAddress;
        model.streetAddress = streetAddress;
        const status = this.fetcher.updateUser(model.user);
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

  listErrors(errors) {
    listValues('user-errors-list-id', errors);
    show('user-errors-view-id');
  }
}