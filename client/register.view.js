// @ts-check
import { getById, getValueById, hide, setErrorsList, show } from './common.js';
import * as fetcher from './fetcher.js';

// @ts-ignore
import { validateRegistration } from './validator.js';

// @ts-ignore
import { Registration } from "./entity.js";

export default () => {
  console.log('*** register view init ...');

  getById('register-command-id').addEventListener('submit', (event) => {
    event.preventDefault();
    hide('register-errors-view-id');

    const role = getValueById('register-role-id');
    const name = getValueById('register-name-id');
    const emailAddress = getValueById('register-email-address-id');
    const streetAddress = getValueById('register-street-address-id');

    const errors = validateRegistration(role, name, emailAddress, streetAddress);
    if (errors.length === 0) {
      const registration = Registration.create(role, name, emailAddress, streetAddress);
      const status = fetcher.register(registration);
      if (!status.success) {
        errors.push(status.error);
        setErrorsList(errors, 'register-errors-list-id', 'register-errors-view-id');
      } else {
        hide('register-view-id"');
        hide('register-menu-id');
        
        show('register-dialog-id');
      }
    } else {
      setErrorsList(errors, 'register-errors-list-id', 'register-errors-view-id');
    }
  }, false);
}