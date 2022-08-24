// @ts-check
export const homeowner = 'homeowner'
export const serviceProvider = 'serviceprovider'

export class Status {
  success: boolean
  error: string

  constructor(success: boolean = true, error: string = '') {
    this.success = success
    this.error = error
  }
}

export class Registration {
  role: string
  name: string
  emailAddress: string
  streetAddress: string

  constructor(role: string, name: string, emailAddress: string, streetAddress: string) {
    this.role = role
    this.name = name
    this.emailAddress = emailAddress
    this.streetAddress = streetAddress
  }

  static success(): Status {
    return new Status()
  }
  
  static fail(error: string): Status {
    return new Status(false, error)
  }
}

export class Credentials {
  emailAddress: string
  pin: string

  constructor(emailAddress: string, pin: string) {
    this.emailAddress = emailAddress
    this.pin = pin
  }
}

export class UsersWorkOrders {
  user: User
  serviceProviders: User[]
  workOrders: WorkOrder[]
  success: boolean
  error: string

  constructor(user: User, serviceProviders: User[], workOrders: WorkOrder[], success: boolean = true, error: string = '') {
    this.user = user
    this.serviceProviders = serviceProviders
    this.workOrders = workOrders
    this.success = success
    this.error = error
  }

  static success(user: User, serviceProviders: User[], workOrders: WorkOrder[]) {
    return new UsersWorkOrders(user, serviceProviders, workOrders)  
  }

  static fail(error: string) {
    return new UsersWorkOrders(User.empty(), [User.empty()], [WorkOrder.empty()], false, error)  
  }
}

export class WorkOrders {
  userId: number
  workOrders: WorkOrder[]
  success: boolean
  error: string

  constructor(userId: number, workOrders: WorkOrder[], success: boolean = true, error: string = '') {
    this.userId = userId
    this.workOrders = workOrders
    this.success = success
    this.error = error
  }

  static success(userId: number, workOrders: WorkOrder[]) {
    return new WorkOrders(userId, workOrders)
  }

  static fail(error: string, userId: number) {
    return new WorkOrders(userId, [WorkOrder.empty()], false, error)
  }
}

export class ImageUrl {
  number: number
  url: string
  success: boolean
  error: string

  constructor(number: number, url: string, success: boolean = true, error: string = '') {
    this.number = number
    this.url = url
    this.success = success
    this.error = error
  }

  static success(number: number, url: string) {
    return new ImageUrl(number, url)
  }

  static fail(error: string, number: number, url: string) {
    return new ImageUrl(number, url, false, error)
  }
}

export class WorkOrderStatus {
  number: number
  success: boolean
  error: string

  constructor(number: number, success: boolean = true, error: string = '') {
    this.number = number
    this.success = success
    this.error = error
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
  id: number
  success: boolean
  error: string

  constructor(id: number, success: boolean = true, error: string = '') {
    this.id = id
    this.success = success
    this.error = error
  }

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