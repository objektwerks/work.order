// @ts-check
import { setValueById } from './document.js';

export default class Model {
  constructor() {
    this.user = {};
    this.serviceproviders = [];
    this.workorders = [];
  }

  bindUserToUserView(user) {
    this.user = user;
    setValueById('user-role-id', user.role);
    setValueById('user-name-id', user.name);
    setValueById('user-email-address-id', user.emailAddress);
    setValueById('user-street-address-id', user.streetAddress);
    setValueById('user-registered-id', user.registered);
  }

  bindUserViewToUser(name, emailAddress, streetAddress) {
    this.user.name = name;
    this.user.emailAddress = emailAddress;
    this.user.streetAddress = streetAddress;
  }

  bindWorkOrderToWorkOrderView(workorder) {
    for(const wo of this.workorders) {
      if (wo.number === workorder.number) {
        setValueById('workorder-number-id', workorder.number);
        setValueById('workorder-homeowner-id', workorder.homeownerId);
        setValueById('workorder-service-provider-id', workorder.serviceProviderId);
        setValueById('workorder-title-id', workorder.title);
        setValueById('workorder-issue-id', workorder.issue);
        setValueById('workorder-image-url-id', workorder.imageUrl);
        setValueById('workorder-resolution-id', workorder.resolution);
        setValueById('workorder-opened-id', workorder.opened);
        setValueById('workorder-closed-id', workorder.closed);
      }
    }
  }

  bindWorkOrderViewToWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) {
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