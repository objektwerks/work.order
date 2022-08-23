// @ts-check
export const homeowner = 'homeowner';
export const serviceProvider = 'serviceprovider';

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
      success: true
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
  static success(user, serviceProviders, workOrders) {
    return {
      success: true,
      user: user,
      serviceProviders: serviceProviders,
      workOrders: workOrders
    }    
  }
  static fail(error) {
    return {
      success: false,
      error: error
    }    
  }
}

export class WorkOrders {
  static success(workOrders) {
    return {
      success: true,
      workOrders: workOrders
    }    
  }

  static fail(error) {
    return {
      success: false,
      error: error
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

  static success(workOrder) {
    return {
      success: true,
      workOrder: workOrder
    }    
  }

  static fail(error, workOrder) {
    return {
      success: false,
      error: error,
      workOrder: workOrder
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
      user: user
    }    
  }

  static fail(error, user) {
    return {
      success: false,
      error: error,
      user: user
    }    
  }
}

export class ImageUrl {
  static success(number, url) {
    return {
      success: true,
      number: number,
      url: url
    }
  }
  static fail(error, number, url) {
    return {
      success: false,
      error: error,
      number: number,
      url: url
    }
  }
}