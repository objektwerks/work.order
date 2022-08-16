// @ts-check
import { getById, getValueById, hide, setListValues, show } from './common.js';

// @ts-ignore
import { Credentials } from './entity.js';

// @ts-ignore
import { validateCredentials } from './validator.js';

export default class LoginView {
  constructor(fetcher, model) {
    this.fetcher = fetcher;
    this.model = model;

    getById('login-command-id').addEventListener('click', () => {
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
          this.model.bindUserToView(userServiceProvidersWorkOrders.user);
          this.model.bindServiceProvidersToSelectView(userServiceProvidersWorkOrders.serviceproviders);
          this.model.bindWorkOrdersToListView(userServiceProvidersWorkOrders.workorders);

          hide('login-view-id');
          hide('register-view-id"');

          hide('login-menu-id');
          hide('register-menu-id');

          show(`workorders-menu-id`);
          show(`user-menu-id`);

          show('workorders-view-id');
        }
      } else {
        this.listErrors(errors);
      }
    }, false);
  }

  listErrors(errors) {
    setListValues('login-errors-list-id', errors);
    show('login-errors-view-id');
  }
}