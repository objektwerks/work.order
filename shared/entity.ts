// @ts-check
export const homeowner = 'homeowner';
export const serviceProvider = 'serviceprovider';

export class Registration {
  static create(role: string, name: string, emailAddress: string, streetAddress: string) {
    return {
      role: role,
      name: name,
      emailAddress: emailAddress,
      streetAddress: streetAddress
    }    
  }
  static success() {
    return {
      success: true
    }
  }
  static fail(error: string) {
    return {
      success: false,
      error: error
    }
  }
}

export class Credentials {
  static create(emailAddress: string, pin: string) {
    return {
      emailAddress: emailAddress,
      pin: pin
    }    
  }
}

export class UsersWorkOrders {
  static success(user: User, serviceProviders: User[], workOrders: WorkOrder[]) {
    return {
      success: true,
      user: user,
      serviceProviders: serviceProviders,
      workOrders: workOrders
    }    
  }
  static fail(error: string) {
    return {
      success: false,
      error: error
    }    
  }
}

export class WorkOrders {
  static success(workOrders: WorkOrder[]) {
    return {
      success: true,
      workOrders: workOrders
    }    
  }

  static fail(error: string) {
    return {
      success: false,
      error: error
    }    
  }
}

export class WorkOrder {
  static create(number: number, homeownerId: number, serviceProviderId: number, title: string, issue: string, imageUrl: string, resolution: string, opened: string, closed: string) {
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

  static success(workOrder: WorkOrder) {
    return {
      success: true,
      workOrder: workOrder
    }    
  }

  static fail(error: string, workOrder: WorkOrder) {
    return {
      success: false,
      error: error,
      workOrder: workOrder
    }    
  }
}

export class User {
  static create(id: number, role: string, name: string, emailAddress: string, streetAddress: string, registered: string) {
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

  static success(user: User) {
    return {
      success: true,
      user: user
    }    
  }

  static fail(error: string, user: User) {
    return {
      success: false,
      error: error,
      user: user
    }    
  }
}

export class ImageUrl {
  static success(number: number, url: string) {
    return {
      success: true,
      number: number,
      url: url
    }
  }
  static fail(error: string, number: number, url: string) {
    return {
      success: false,
      error: error,
      number: number,
      url: url
    }
  }
}