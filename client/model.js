// @ts-check
import { WorkOrder } from '../shared/entity.js';
import { setListIdValues, setSelectIdValues, setSelectOptionById, setImageUrlById, setValueById } from './common.js';

export default class Model {
  constructor() {
    this.user = {};
    this.serviceproviders = [];
    this.workorders = new Map();
  }

  addWorkOrder(workorder) {
    this.workorders.set(workorder.number, workorder);
  }

  bindUserToView(user) {
    this.user = user;
    setValueById('user-role-id', user.role);
    setValueById('user-name-id', user.name);
    setValueById('user-email-address-id', user.emailAddress);
    setValueById('user-street-address-id', user.streetAddress);
    setValueById('user-registered-id', user.registered);
  }

  bindServiceProvidersToSelectView(serviceproviders) {
    const idvalues = [];
    for (const serviceprovider of serviceproviders) {
      idvalues.push({ id: serviceprovider.id, value: serviceprovider.name });
    }
    setSelectIdValues('workorder-service-provider-id', idvalues);
  }

  bindWorkOrdersToListView(workorders) {
    this.workorders.clear();
    const idvalues = [];
    for (const workorder of workorders) {
      this.workorders.set(workorder.number, workorder);
      idvalues.push({ id: workorder.number, value: workorder.title });
    }
    setListIdValues('workorders-list-id', idvalues);
  }

  bindEmptyWorkOrderToView() {
    setValueById('workorder-number-id', 0);
    setValueById('workorder-title-id', "");
    setValueById('workorder-issue-id', "");
    setValueById('workorder-image-url-id', "");
    setValueById('workorder-resolution-id', "");
    setValueById('workorder-opened-id', new Date().toISOString());
    setValueById('workorder-closed-id', "");
  }

  bindWorkOrderToView(workorder) {
    setValueById('workorder-number-id', workorder.number);
    setSelectOptionById('workorder-service-provider-id', workorder.serviceProviderId);
    setValueById('workorder-title-id', workorder.title);
    setValueById('workorder-issue-id', workorder.issue);
    setImageUrlById('workorder-image-url-id', workorder.imageUrl);
    setValueById('workorder-resolution-id', workorder.resolution);
    setValueById('workorder-opened-id', workorder.opened);
    setValueById('workorder-closed-id', workorder.closed);
  }
}