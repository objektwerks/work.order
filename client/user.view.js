// @ts-check
import { getById, getValueById, hide, setListValues, show } from './common.js';

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
        this.bindViewToUser(name, emailAddress, streetAddress);
        const status = this.fetcher.saveUser(model.user);
        if (!status.success) {
          errors.push(status.error);
          this.listErrors(errors);
        } else {          
          show('user-dialog-id');
        }
      } else {
        this.listErrors(errors);
      }      
    }, false);
  }

  bindViewToUser(name, emailAddress, streetAddress) {
    this.model.user.name = name;
    this.model.user.emailAddress = emailAddress;
    this.model.user.streetAddress = streetAddress;
  }

  listErrors(errors) {
    setListValues('user-errors-list-id', errors);
    show('user-errors-view-id');
  }
}