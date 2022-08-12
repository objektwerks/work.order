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
  }

  bindUserViewToUser(name, emailAddress, streetAddress) {
    this.user.name = name;
    this.user.emailAddress = emailAddress;
    this.user.streetAddress = streetAddress;
  }
}