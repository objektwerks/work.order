// @ts-check
import { getById, getValueById, hide, setListValues, show } from './common.js';
import * as fetcher from './fetcher.js';
import * as model from './model.js';

// @ts-ignore
import { validateUserView } from './validator.js';

export default () => {
  console.log('*** user view init ...');

  getById('user-save-command-id').addEventListener('click', () => {
    hide('user-errors-view-id');

    const name = getValueById('user-name-id');
    const emailAddress = getValueById('user-email-address-id');
    const streetAddress = getValueById('user-street-address-id');

    const errors = validateUserView(name, emailAddress, streetAddress);
    if (errors.length === 0) {
      bindViewToUser(name, emailAddress, streetAddress);
      const status = fetcher.saveUser(model.getUser());
      if (!status.success) {
        errors.push(status.error);
        listErrors(errors);
      } else {          
        show('user-dialog-id');
      }
    } else {
      listErrors(errors);
    }      
  }, false);
}

function bindViewToUser(name, emailAddress, streetAddress) {
  model.setUser(name, emailAddress, streetAddress);
}

function listErrors(errors) {
  setListValues('user-errors-list-id', errors);
  show('user-errors-view-id');
}