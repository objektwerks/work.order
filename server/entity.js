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
  constructor(number, homeownerId, serviceProviderId, issue) {
    this(number, homeownerId, serviceProviderId, issue, "", new Date().toISOString, "")
  }

  constructor(number, homeownerId, serviceProviderId, issue, resolution, opened, closed) {
    this.number = number,
    this.homeownerId = homeownerId,
    this.serviceProviderId = serviceProviderId,
    this.issue = issue,
    this.resolution = resolution,
    this.opened = opened,
    this.closed = closed
  }

  toJson() {
    return JSON.stringify(
      {
        number: this.number,
        homeownerId: this.homeownerId,
        serviceProviderId: this.serviceProviderId,
        issue: this.issue,
        resolution: this.resolution,
        opened: this.opened,
        closed: this.closed
      }
    )
  }

  toObject(json) {
    return JSON.parse(json)
  }
}