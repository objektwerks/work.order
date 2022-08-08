// @ts-check
export const admin = 'admin';
export const homeowner = 'homeowner';
export const serviceProvider = 'serviceprovider';

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

  static validate(role, name, emailAddress, streetAddress) {
    let errors = [];
    if (role != homeowner || role != serviceProvider) errors.push("Select a role.");
    if (name.length < 2) errors.push('For name, enter at least 2 characters.');
    if (emailAddress.length < 3) errors.push('For email address, enter at least 3 characters.');
    if (streetAddress.length < 3) errors.push('For street address, enter at least 3 characters.');
    return errors;
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
      error: ''
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
  static success(user, workorders) {
    return {
      success: true,
      error: '',
      user: user,
      workorders: workorders
    }    
  }
  static fail(error) {
    return {
      success: false,
      error: error,
      user: {},
      workorders: []
    }    
  }
}

export class WorkOrders {
  static success(workorders) {
    return {
      success: true,
      error: '',
      workorders: workorders
    }    
  }

  static fail(error) {
    return {
      success: false,
      error: error,
      workorders: []
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

  static success(workorder) {
    return {
      success: true,
      error: '',
      workorder: workorder
    }    
  }

  static fail(error) {
    return {
      success: false,
      error: error,
      workorder: {}
    }    
  }
}

export class Users {
  static success(users) {
    return {
      success: true,
      error: '',
      users: users
    }    
  }

  static fail(error) {
    return {
      success: false,
      error: error,
      users: []
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
      pin: ''
    }
  }

  static success(user) {
    return {
      success: true,
      error: '',
      user: user
    }    
  }

  static fail(error) {
    return {
      success: false,
      error: error,
      user: {}
    }    
  }
}