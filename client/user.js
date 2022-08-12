// @ts-check
import { getById, getValueById, hide, listValues, show } from './document.js';

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
      
    }, false);
  }
}