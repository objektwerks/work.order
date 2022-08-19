// @ts-check
import { getById, getValueById, hide, setErrorsList, show } from './common.js';
import * as fetcher from './fetcher.js';
import * as model from './model.js';

// @ts-ignore
import { serviceProvider, Credentials } from './entity.js';

// @ts-ignore
import { validateCredentials } from './validator.js';

export default () => {
  console.log('*** login view init ...');

  getById('login-command-id').addEventListener('click', () => {
    hide('login-errors-view-id');

    const emailAddress = getValueById('login-email-address-id');
    const pin = getValueById('login-pin-id');

    const errors = validateCredentials(emailAddress, pin);
    if (errors.length === 0) {
      const credentials = Credentials.create(emailAddress, pin);
      const userServiceProvidersWorkOrders = fetcher.login(credentials);
      if (!userServiceProvidersWorkOrders.success) {
        errors.push(userServiceProvidersWorkOrders.error);
        setErrorsList(errors, 'login-errors-list-id', 'login-errors-view-id');
      } else {
        model.bindUserToView(userServiceProvidersWorkOrders.user);
        model.bindServiceProvidersToSelectView(userServiceProvidersWorkOrders.serviceProviders);
        model.bindWorkOrdersToListView(userServiceProvidersWorkOrders.workOrders);

        hide('login-view-id');
        hide('register-view-id"');

        hide('login-menu-id');
        hide('register-menu-id');

        show(`workorders-menu-id`);
        show(`user-menu-id`);

        if (model.getUserRole === serviceProvider) {
          hide('workorder-new-command-id');
        }
        show('workorders-view-id');
      }
    } else {
      setErrorsList(errors, 'login-errors-list-id', 'login-errors-view-id');
    }
  }, false);
}