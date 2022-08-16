// @ts-check
export const homeowner = 'homeowner';
export const serviceProvider = 'serviceprovider';

export function toJson(object) {
  return JSON.stringify(object);
}

export function toObject(json) {
  return JSON.parse(json);
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

export class UserServiceProvidersWorkOrders {
  static success(user, serviceproviders, workorders) {
    return {
      success: true,
      error: '',
      user: user,
      serviceproviders: serviceproviders,
      workorders: workorders
    }    
  }
  static fail(error) {
    return {
      success: false,
      error: error,
      user: {},
      serviceproviders: [],
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
  static create(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) {
    return {
      number: number,
      homeownerId: homeownerId,
      serviceProviderId: serviceProviderId,
      title: title,
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

  static fail(error, number) {
    return {
      success: false,
      error: error,
      number: number
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

export class ImageUrl {
  static success(url, number) {
    return {
      success: true,
      error: '',
      url: url,
      number: number
    }
  }
  static fail(error, url, number) {
    return {
      success: false,
      error: error,
      url: url,
      number: number
    }
  }
}
