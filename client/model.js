// @ts-check
import { setImageUrlById, setValueById } from './common.js';

export default class Model {
  constructor() {
    this.user = {};
    this.serviceproviders = [];
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

  bindServiceProvidersToListView(serviceproviders) {
    this.serviceproviders = serviceproviders;
    // TODO see add service providers to select with options below.
  }

  bindWorkOrdersToListView(workorders) {
    for ( const workorder of workorders) {
      this.workorders.set(workorder.number, workorder);
    }
    // TODO add work orders to workorders-list-id! See common.listIdValues
  }

  bindEmptyWorkOrderToView() {
    setValueById('workorder-number-id', 0);
    setValueById('workorder-homeowner-id', 0);
    setValueById('workorder-service-provider-id', 0); // TODO add service providers to select with options!
    setValueById('workorder-title-id', "");
    setValueById('workorder-issue-id', "");
    setValueById('workorder-image-url-id', "");
    setValueById('workorder-resolution-id', "");
    setValueById('workorder-opened-id', "");
    setValueById('workorder-closed-id', "");
  }

  bindWorkOrderToView(workorder) {
    for(const wo of this.workorders) {
      if (wo.number === workorder.number) {
        setValueById('workorder-number-id', workorder.number);
        setValueById('workorder-homeowner-id', workorder.homeownerId);
        setValueById('workorder-service-provider-id', workorder.serviceProviderId); // TODO add service providers to select with options!
        setValueById('workorder-title-id', workorder.title);
        setValueById('workorder-issue-id', workorder.issue);
        setImageUrlById('workorder-image-url-id', workorder.imageUrl);
        setValueById('workorder-resolution-id', workorder.resolution);
        setValueById('workorder-opened-id', workorder.opened);
        setValueById('workorder-closed-id', workorder.closed);
      }
    }
  }

  bindViewToWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) {
    for(const workorder of this.workorders) {
      if (workorder.number === number) {
        workorder.number = number;
        workorder.homeownerId = homeownerId;
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
}