// @ts-check
import { WorkOrder } from '../shared/entity.js';
import { setListIdValues, selectIdValues, setSelectOptionById, setImageUrlById, setValueById } from './common.js';

export default class Model {
  constructor() {
    this.user = {};
    this.serviceproviders = [];
    this.workorders = new Map();
    this.selectedWorkOrder = WorkOrder.empty();
  }

  bindUserToView(user) {
    this.user = user;
    setValueById('user-role-id', user.role);
    setValueById('user-name-id', user.name);
    setValueById('user-email-address-id', user.emailAddress);
    setValueById('user-street-address-id', user.streetAddress);
    setValueById('user-registered-id', user.registered);
  }

  bindViewToUser(name, emailAddress, streetAddress) {
    this.user.name = name;
    this.user.emailAddress = emailAddress;
    this.user.streetAddress = streetAddress;
  }

  bindServiceProvidersToSelectView(serviceproviders) {
    const idvalues = [];
    for (const serviceprovider of serviceproviders) {
      idvalues.push({ id: serviceprovider.id, value: serviceprovider.name });
    }
    selectIdValues('workorder-service-provider-id', idvalues);
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
    setValueById('workorder-opened-id', "");
    setValueById('workorder-closed-id', "");
    this.selectedWorkOrder = WorkOrder.empty();
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
    this.selectedWorkOrder = workorder;
  }

  bindViewToWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) {
    if (number > 0) { // save
      this.selectedWorkOrder.number = number;
      this.selectedWorkOrder.homeownerId = homeownerId;
      this.selectedWorkOrder.serviceProviderId = serviceProviderId;
      this.selectedWorkOrder.title = title;
      this.selectedWorkOrder.issue = issue;
      this.selectedWorkOrder.imageUrl = imageUrl;
      this.selectedWorkOrder.resolution = resolution;
      this.selectedWorkOrder.opened = opened;
      this.selectedWorkOrder.closed = closed;
    } else { // add
      this.selectedWorkOrder = WorkOrder.create(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed);
    }
    return this.selectedWorkOrder;
  }
}