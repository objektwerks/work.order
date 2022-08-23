// @ts-check
import { getById, getValueById, hide, setErrorsList, show } from './common.js';
import * as fetcher from './fetcher.js';
import * as model from './model.js';

// @ts-ignore
import { serviceProvider, Credentials } from './entity.js';

// @ts-ignore
import { validateCredentials } from './validator.js';

export default () => {
  console.log('*** login form init ...');

  getById('login-form-id').addEventListener('submit', (event) => {
    event.preventDefault();
    hide('login-errors-form-id');

    const emailAddress = getValueById('login-email-address-id');
    const pin = getValueById('login-pin-id');

    const errors = validateCredentials(emailAddress, pin);
    if (errors.length === 0) {
      const credentials = Credentials.create(emailAddress, pin);
      const userServiceProvidersWorkOrders = fetcher.login(credentials);
      if (!userServiceProvidersWorkOrders.success) {
        errors.push(userServiceProvidersWorkOrders.error);
        setErrorsList(errors, 'login-errors-list-id', 'login-errors-form-id');
      } else {
        model.bindUserToView(userServiceProvidersWorkOrders.user);
        model.bindServiceProvidersToSelectView(userServiceProvidersWorkOrders.serviceProviders);
        model.bindWorkOrdersToListView(userServiceProvidersWorkOrders.workOrders);

        hide('login-form-id');
        hide('register-form-id"');

        hide('login-menu-id');
        hide('register-menu-id');

        show(`workorders-menu-id`);
        show(`user-menu-id`);

        if (model.getUserRole === serviceProvider) {
          hide('workorder-new-command-id');
        }
        show('workorders-form-id');
      }
    } else {
      setErrorsList(errors, 'login-errors-list-id', 'login-errors-form-id');
    }
  }, false);
}