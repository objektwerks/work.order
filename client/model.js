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
}