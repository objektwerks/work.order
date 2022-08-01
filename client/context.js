export const admin = "admin";
export const homeowner = "homeowner";
export const serviceProvider = "serviceprovider"

export class User {
  constructor(id, role, name, emailAddress, streetAddress, registered) {
    this.id = id;
    this.role = role;
    this.emailAddress = emailAddress;
    this.streetAddress = streetAddress;
    this.registered = registered;
  }
}

export class WorkOrder {
  constructor(number, homeowner, serviceProvider, opened, closed, issue, resolution) {
    this.number = number;
    this.homeowner = homeowner;
    this.serviceProvider = serviceProvider;
    this.opened = opened;
    this.closed = closed;
    this.issue = issue;
    this.resolution = resolution;
  }
}