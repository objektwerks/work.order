export const admin = "admin";
export const homeowner = "homeowner";
export const serviceProvider = "serviceprovider"

export class Entity {
  static toJson(object) {
    return JSON.stringify(object)
  }

  static toObject(json) {
    return JSON.parse(json)
  }
}

export class Register {
  static create(role, name, emailAddress, streetAddress) {
    return {
      role: role,
      name: name,
      emailAddress: emailAddress,
      streetAddress: streetAddress
    }    
  }
}

export class Login {
  static create(emailAddress, pin) {
    return {
      emailAddress: emailAddress,
      pin: pin
    }    
  }
}

export class User {
  static create(id, role, name, emailAddress, streetAddress) {
    return create(id, role, name, emailAddress, streetAddress, new Date().toISOString);
  }

  static create(id, role, name, emailAddress, streetAddress, registered) {
    return {
      id: id,
      role: role,
      name: name,
      emailAddress: emailAddress,
      streetAddress: streetAddress,
      registered: registered
    }
  }
}

export class WorkOrder {
  static create(number, homeownerId, serviceProviderId, issue) {
    return create(number, homeownerId, serviceProviderId, issue, "", new Date().toISOString, "");
  }

  static create(number, homeownerId, serviceProviderId, issue, resolution, opened, closed) {
    return {
      number: number,
      homeownerId: homeownerId,
      serviceProviderId: serviceProviderId,
      issue: issue,
      resolution: resolution,
      opened: opened,
      closed: closed
    }
  }
}