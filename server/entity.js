export const admin = "admin";
export const homeowner = "homeowner";
export const serviceProvider = "serviceprovider"

export function toJson(object) {
  return JSON.stringify(object)
}

export function toObject(json) {
  return JSON.parse(json)
}

export class Registration {
  static create(role, name, emailAddress, streetAddress) {
    return {
      role: role,
      name: name,
      emailAddress: emailAddress,
      streetAddress: streetAddress
    }    
  }
}

export class Credentials {
  static create(emailAddress, pin) {
    return {
      emailAddress: emailAddress,
      pin: pin
    }    
  }
}

export class Status {
  static success() {
    return {
      success: true,
      error: ""
    }
  }
  static fail(error) {
    return {
      success: false,
      error: error
    }
  }
}

export class UserWorkOrders {
  static create(error, user, workorders) {
    return {
      error: error,
      user: user,
      workorders: workorders
    }    
  }
}

export class WorkOrder {
  static create(number, homeownerId, serviceProviderId, issue, imageUrl, resolution, opened, closed) {
    return {
      number: number,
      homeownerId: homeownerId,
      serviceProviderId: serviceProviderId,
      issue: issue,
      imageUrl: imageUrl,
      resolution: resolution,
      opened: opened,
      closed: closed
    }
  }

  static single(error, workorder) {
    return {
      error: error,
      workorder: workorder
    }    
  }

  static list(error, workorders) {
    return {
      error: error,
      workorders: workorders
    }    
  }
}

export class User {
  static create(id, role, name, emailAddress, streetAddress, registered) {
    return {
      id: id,
      role: role,
      name: name,
      emailAddress: emailAddress,
      streetAddress: streetAddress,
      registered: registered,
      pin: ""
    }
  }
}