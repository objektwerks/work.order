// @ts-check
export const homeowner = 'homeowner'
export const serviceProvider = 'serviceprovider'

export function toJson<T>(object: T): string {
  return JSON.stringify(object)
}

function toObject<T>(json: string): T {
  return JSON.parse(json)
}

export class Status {
  constructor(public success: boolean = true, 
              public error: string = '') {}

  static fromJson(json: string): Status {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any): Status {
    return new Status(object.success, object.error)
  }
}

export class Registration {
  constructor(public role: string, 
              public name: string, 
              public emailAddress: string, 
              public streetAddress: string) {}

  static fromJson(json: string): Registration {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any): Registration {
    return new Registration(object.role, object. name, object.emailAddress, object.streetAddress)
  }

  static success(): Status {
    return new Status()
  }
  
  static fail(error: string): Status {
    return new Status(false, error)
  }
}

export class Credentials {
  constructor(public emailAddress: string, 
              public pin: string) {}

  static fromJson(json: string): Credentials {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any): Credentials {
    return new Credentials(object.emailAddress, object.pin)
  }
}

export class UsersWorkOrders {
  constructor(public user: User, 
              public serviceProviders: User[], 
              public workOrders: WorkOrder[], 
              public success: boolean = true, 
              public error: string = '') {}

  static fromJson(json: string): UsersWorkOrders {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any): UsersWorkOrders {
    return new UsersWorkOrders(object.user, object.serviceProviders, object.workOrders)
  }

  static success(user: User, serviceProviders: User[], workOrders: WorkOrder[]): UsersWorkOrders {
    return new UsersWorkOrders(user, serviceProviders, workOrders)  
  }

  static fail(error: string): UsersWorkOrders {
    return new UsersWorkOrders(User.empty(), [User.empty()], [WorkOrder.empty()], false, error)  
  }
}

export class WorkOrders {
  constructor(public userId: number, 
              public workOrders: WorkOrder[], 
              public success: boolean = true, 
              public error: string = '') {}

  static fromJson(json: string): WorkOrders {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any): WorkOrders {
    return new WorkOrders(object.userId, object.workOrders)
  }

  static success(userId: number, workOrders: WorkOrder[]): WorkOrders {
    return new WorkOrders(userId, workOrders)
  }

  static fail(error: string, userId: number): WorkOrders {
    return new WorkOrders(userId, [WorkOrder.empty()], false, error)
  }
}

export class ImageUrl {
  constructor(public number: number, 
              public url: string, 
              public success: boolean = true, 
              public error: string = '') {}

  static fromJson(json: string): ImageUrl {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any): ImageUrl {
    return new ImageUrl(object.number, object.url)
  }

  static success(number: number, url: string): ImageUrl {
    return new ImageUrl(number, url)
  }

  static fail(error: string, number: number, url: string): ImageUrl {
    return new ImageUrl(number, url, false, error)
  }
}

export class WorkOrderStatus {
  constructor(public number: number, 
              public success: boolean = true, 
              public error: string = '') {}

  static fromJson(json: string): WorkOrderStatus {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any): WorkOrderStatus {
    return new WorkOrderStatus(object.number)
  }

  static success(number: number): WorkOrderStatus {
    return new WorkOrderStatus(number)
  }

  static fail(error: string, number: number): WorkOrderStatus {
    return new WorkOrderStatus(number, false, error)
  }
}

export class WorkOrder {
  constructor(public number: number,
              public homeownerId: number, 
              public serviceProviderId: number, 
              public title: string, 
              public issue: string, 
              public imageUrl: string, 
              public resolution: string, 
              public opened: string, 
              public closed: string,
              public success: boolean = true,
              public error: string = '') {}

  static fromJson(json: string): WorkOrder {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any): WorkOrder {
    return new WorkOrder(object.number, object.homeownerId, object.serviceProviderId, object.title, object.issue, object.imageUrl, object.resolution, object.opened, object.closed)
  }

  static empty(): WorkOrder {
    return new WorkOrder(0, 0, 0, '', '', '', '', '', '')
  }

  static success(workOrder: WorkOrder): WorkOrder {
    return workOrder
  }

  static fail(error: string, number: number): WorkOrder {
    const workOrder = WorkOrder.empty()
    workOrder.number = number
    workOrder.success = false
    workOrder.error = error
    return workOrder 
  }
}

export class UserStatus {
  constructor(public id: number, 
              public success: boolean = true, 
              public error: string = '') {}

  static fromJson(json: string): UserStatus {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any): UserStatus {
    return new UserStatus(object.is)
  }

  static success(id: number): UserStatus {
    return new UserStatus(id)
  }

  static fail(error: string, id: number): UserStatus {
    return new UserStatus(id, false, error)
  }
}

export class User {
  constructor(public id: number, 
              public role: string, 
              public name: string, 
              public emailAddress: string, 
              public streetAddress: string, 
              public registered: string, 
              public pin: string,
              public success: boolean = true,
              public error: string = '') {}

  static fromJson(json: string): User {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any): User {
    return new User(object.id, object.role, object.name, object.emailAddress, object.streetAddress, object.registered, object.pin)
  }

  static empty(): User {
    return new User(0, '', '', '', '', '', '')
  }
}