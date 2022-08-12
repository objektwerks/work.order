// @ts-check
import { getById, getValueById, hide, listValues, show } from './document.js';

// @ts-ignore
import { Credentials } from './entity.js';

// @ts-ignore
import { validateCredentials } from './validator.js';

export default class LoginView {
  constructor(fetcher, model) {
    this.fetcher = fetcher;
    this.model = model;

    getById('login-command-id').addEventListener('click', () => {
      hide('register-info-view-id');
      hide('login-errors-view-id');

      const emailAddress = getValueById('login-email-address-id');
      const pin = getValueById('login-pin-id');

      const errors = validateCredentials(emailAddress, pin);
      if (errors.length === 0) {
        const credentials = Credentials.create(emailAddress, pin);
        const userServiceProvidersWorkOrders = this.fetcher.login(credentials);
        if (!userServiceProvidersWorkOrders.success) {
          errors.push(userServiceProvidersWorkOrders.error);
          this.listErrors(errors);
        } else {
          model.bindUserToView(userServiceProvidersWorkOrders.user);
          model.bindServiceProvidersToListView(userServiceProvidersWorkOrders.serviceproviders);
          model.bindWorkOrdersToListView(userServiceProvidersWorkOrders.workorders);

          hide('login-view-id');
          hide('login-menu-id');

          hide('register-view-id"');
          hide('register-info-view-id');
          hide('register-menu-id');

          show('workorders-view-id');
          show(`workorders-menu-id`);
          show(`user-menu-id`);
        }
      } else {
        this.listErrors(errors);
      }
    }, false);
  }

  listErrors(errors) {
    listValues('login-errors-list-id', errors);
    show('login-errors-view-id');
  }
}