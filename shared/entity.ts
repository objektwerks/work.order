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

  constructor(user: User, serviceProviders: User[], workOrders: WorkOrder[], success: boolean = true, error: string = ''){
    this.user = user
    this.serviceProviders = serviceProviders
    this.workOrders = workOrders
    this.success = true
    this.error = ''
  }

  static success(user: User, serviceProviders: User[], workOrders: WorkOrder[]) {
    return new UsersWorkOrders(user, serviceProviders, workOrders)  
  }
  static fail(error: string) {
    return new UsersWorkOrders(User.empty(), [User.empty()], [WorkOrder.empty()], false, error)  
  }
}

export class WorkOrders {
  workOrders: WorkOrder[]
  success: boolean
  error: string

  constructor(workOrders: WorkOrder[], success: boolean = true, error: string = ''){
    this.workOrders = workOrders
    this.success = true
    this.error = ''
  }

  static success(workOrders: WorkOrder[]) {
    return new WorkOrders(workOrders)
  }

  static fail(error: string) {
    return new WorkOrders([WorkOrder.empty()], false, error)
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

export class WorkOrder {
  number: number
  homeownerId: number
  serviceProviderId: number
  title: string
  issue: string
  imageUrl: string
  resolution: string
  opened: string
  closed: string

  constructor(number: number, homeownerId: number, serviceProviderId: number, title: string, issue: string, imageUrl: string, resolution: string, opened: string, closed: string) {
    this.number = number
    this.homeownerId = homeownerId
    this.serviceProviderId = serviceProviderId
    this.title = title
    this.issue = issue
    this.imageUrl = imageUrl
    this.resolution = resolution
    this.opened = opened
    this.closed = closed
  }

  static empty() {
    return new WorkOrder(0, 0, 0, '', '', '', '', '', '')
  }

  static success(workOrder: WorkOrder) {
    return {
      success: true,
      workOrder: workOrder
    }    
  }

  static fail(error: string, number: number) {
    return {
      success: false,
      error: error,
      number: number
    }    
  }
}

export class User {
  id: number
  role: string
  name: string
  emailAddress: string
  streetAddress: string
  registered: string
  pin: string

  constructor(id: number, role: string, name: string, emailAddress: string, streetAddress: string, registered: string, pin: string) {
    this.id = id
    this.role = role
    this.name = name
    this.emailAddress = emailAddress
    this.streetAddress = streetAddress
    this.registered = registered
    this.pin = pin
  }

  static empty() {
    return new User(0, '', '', '', '', '', '')
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