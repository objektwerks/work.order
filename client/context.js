export const admin = "admin";
export const homeowner = "homeowner";
export const serviceProvider = "serviceprovider"

export class User {
  constructor(id, role, name, emailAddress, streetAddress) {
    this(id, role, name, emailAddress, streetAddress, new Date().toISOString)
  }

  constructor(id, role, name, emailAddress, streetAddress, registered) {
    this.id = id;
    this.role = role;
    this.name = name;
    this.emailAddress = emailAddress;
    this.streetAddress = streetAddress;
    this.registered = registered;
  }

  toJson() {
    return JSON.stringify(
      {
        id: this.id,
        role: this.role,
        name: this.name,
        emmailAddress: this.emailAddress,
        streetAddress: this.streetAddress,
        registered: this.registered
      }
    )
  }

  toObject(json) {
    return JSON.parse(json)
  }
}

export class WorkOrder {
  constructor(number, homeowner, serviceProvider, opened, closed, issue, resolution) {
    this.number = number,
    this.homeowner = homeowner,
    this.serviceProvider = serviceProvider,
    this.opened = opened,
    this.closed = closed,
    this.issue = issue,
    this.resolution = resolution
  }

  toJson() {
    return JSON.stringify(
      {
        number: this.number,
        homeowner: this.homeowner,
        serviceProvider: this.serviceProvider,
        opened: this.opened,
        closed: this.closed,
        issue: this.issue,
        resolution: this.resolution
      }
    )
  }

  toObject(json) {
    return JSON.parse(json)
  }
}