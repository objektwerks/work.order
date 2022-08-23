// @ts-check
import { getById, getValueById, hide, setErrorsList, show } from './common.js';
import * as fetcher from './fetcher.js';
import * as state from './state.js';

// @ts-ignore
import { validateUserView } from './validator.js';

function bindFormToUser(name, emailAddress, streetAddress) {
  state.setUser(name, emailAddress, streetAddress);
}

export default () => {
  console.log('*** user form init ...');

  getById('user-form-id').addEventListener('submit', (event) => {
    event.preventDefault();
    hide('user-errors-form-id');

    const name = getValueById('user-name-id');
    const emailAddress = getValueById('user-email-address-id');
    const streetAddress = getValueById('user-street-address-id');

    const errors = validateUserView(name, emailAddress, streetAddress);
    if (errors.length === 0) {
      bindFormToUser(name, emailAddress, streetAddress);
      const status = fetcher.saveUser(state.getUser());
      if (!status.success) {
        errors.push(status.error);
        setErrorsList(errors, 'user-errors-list-id', 'user-errors-form-id');
      } else {          
        show('user-dialog-id');
      }
    } else {
      setErrorsList(errors, 'user-errors-list-id', 'user-errors-form-id');
    }      
  }, false);
}