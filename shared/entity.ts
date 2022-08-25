// @ts-check
export const homeowner = 'homeowner'
export const serviceProvider = 'serviceprovider'

export function toJson(object: any) {
  return JSON.stringify(object)
}

export function toObject(json: string) {
  return JSON.parse(json)
}

export class Status {
  constructor(public success: boolean = true, 
              public error: string = '') {}

  static fromJson(json: string) {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any) {
    return new Status(object.success, object.error)
  }
}

export class Registration {
  constructor(public role: string, 
              public name: string, 
              public emailAddress: string, 
              public streetAddress: string) {}

  static fromJson(json: string) {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any) {
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
}

export class UsersWorkOrders {
  constructor(public user: User, 
              public serviceProviders: User[], 
              public workOrders: WorkOrder[], 
              public success: boolean = true, 
              public error: string = '') {}

  static fromJson(json: string) {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any) {
    return new UsersWorkOrders(object.user, object.serviceProviders, object.workOrders)
  }

  static success(user: User, serviceProviders: User[], workOrders: WorkOrder[]) {
    return new UsersWorkOrders(user, serviceProviders, workOrders)  
  }

  static fail(error: string) {
    return new UsersWorkOrders(User.empty(), [User.empty()], [WorkOrder.empty()], false, error)  
  }
}

export class WorkOrders {
  constructor(public userId: number, 
              public workOrders: WorkOrder[], 
              public success: boolean = true, 
              public error: string = '') {}

  static fromJson(json: string) {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any) {
    return new WorkOrders(object.userId, object.workOrders)
  }

  static success(userId: number, workOrders: WorkOrder[]) {
    return new WorkOrders(userId, workOrders)
  }

  static fail(error: string, userId: number) {
    return new WorkOrders(userId, [WorkOrder.empty()], false, error)
  }
}

export class ImageUrl {
  constructor(public number: number, 
              public url: string, 
              public success: boolean = true, 
              public error: string = '') {}

  static fromJson(json: string) {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any) {
    return new ImageUrl(object.number, object.url)
  }

  static success(number: number, url: string) {
    return new ImageUrl(number, url)
  }

  static fail(error: string, number: number, url: string) {
    return new ImageUrl(number, url, false, error)
  }
}

export class WorkOrderStatus {
  constructor(public number: number, 
              public success: boolean = true, 
              public error: string = '') {}

  static fromJson(json: string) {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any) {
    return new WorkOrderStatus(object.number)
  }

  static success(number: number) {
    return new WorkOrderStatus(number)
  }

  static fail(error: string, number: number) {
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

  static fromJson(json: string) {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: any) {
    return new WorkOrder(object.number, object.homeownerId, object.serviceProviderId, object.title, object.issue, object.imageUrl, object.resolution, object.opened, object.closed)
  }

  static empty() {
    return new WorkOrder(0, 0, 0, '', '', '', '', '', '')
  }

  static success(workOrder: WorkOrder) {
    return workOrder
  }

  static fail(error: string, number: number) {
    let workOrder = WorkOrder.empty()
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

  static success(id: number) {
    return new UserStatus(id)
  }

  static fail(error: string, id: number) {
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

  static empty() {
    return new User(0, '', '', '', '', '', '')
  }
}