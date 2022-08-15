// @ts-check
import { listIdValues, selectIdValues, setImageUrlById, setValueById } from './common.js';

export default class Model {
  constructor() {
    this.user = {};
    this.serviceproviders = new Map();
    this.workorders = new Map();
    this.selectedworkorder = {};
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
    this.serviceproviders.clear();
    const idvalues = [];
    for (const serviceprovider of serviceproviders) {
      this.serviceproviders.set(serviceprovider.id, serviceprovider);
      idvalues.push({ id: serviceprovider.id, value: serviceprovider.name })
    }
    selectIdValues('workorder-service-provider-id', idvalues);  }

  bindWorkOrdersToListView(workorders) {
    this.workorders.clear();
    const idvalues = [];
    for (const workorder of workorders) {
      this.workorders.set(workorder.number, workorder);
      idvalues.push({ id: workorder.number, value: workorder.title })
    }
    listIdValues('workorders-list-id', idvalues);
  }

  bindEmptyWorkOrderToView() {
    setValueById('workorder-number-id', 0);
    setValueById('workorder-service-provider-id', 0); // TODO add service providers to select with options, see above
    setValueById('workorder-title-id', "");
    setValueById('workorder-issue-id', "");
    setValueById('workorder-image-url-id', "");
    setValueById('workorder-resolution-id', "");
    setValueById('workorder-opened-id', "");
    setValueById('workorder-closed-id', "");
  }

  bindWorkOrderToView(workorder) {
    const wo = this.workorders.get(workorder.number);
    if (wo !== undefined && wo.number === workorder.number) {
      setValueById('workorder-number-id', workorder.number);
      setValueById('workorder-service-provider-id', workorder.serviceProviderId); // TODO add service providers to select with options, see above
      setValueById('workorder-title-id', workorder.title);
      setValueById('workorder-issue-id', workorder.issue);
      setImageUrlById('workorder-image-url-id', workorder.imageUrl);
      setValueById('workorder-resolution-id', workorder.resolution);
      setValueById('workorder-opened-id', workorder.opened);
      setValueById('workorder-closed-id', workorder.closed);
    }
  }

  bindViewToWorkOrder(number, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) {
    const workorder = this.workorders.get(number);
    if (workorder !== undefined && workorder.number === number) {
      workorder.number = number;
      workorder.serviceProviderId = serviceProviderId;
      workorder.title = title;
      workorder.issue = issue;
      workorder.imageUrl = imageUrl;
      workorder.resolution = resolution;
      workorder.opened = opened;
      workorder.closed = closed;
    }
  }
}