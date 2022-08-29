export const homeowner = 'homeowner'
export const serviceProvider = 'serviceprovider'

export function toJson<T>(object: T): string {
  console.log('*** toJson: ', object)
  return JSON.stringify(object)
}

export function toObject<T>(json: string): T {
  console.log('*** toObject: ', json)
  return JSON.parse(json)
}

export class Status {
  constructor(public success: boolean = true, 
              public error: string = '',
              public readonly pin: string = '') {}

  static fromJson(json: string): Status {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: Status): Status {
    return new Status(object.success, object.error, object.pin)
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

  static fromObject(object: Registration): Registration {
    return new Registration(object.role, object. name, object.emailAddress, object.streetAddress)
  }

  static success(pin: string): Status {
    return new Status(true, '', pin)
  }
  
  static fail(error: string): Status {
    return new Status(false, error, '')
  }
}

export class Credentials {
  constructor(public emailAddress: string, 
              public pin: string) {}

  static fromJson(json: string): Credentials {
    return this.fromObject(toObject(json))
  }

  static fromObject(object: Credentials): Credentials {
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

  static fromObject(object: UsersWorkOrders): UsersWorkOrders {
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

  static fromObject(object: WorkOrders): WorkOrders {
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

  static fromObject(object: ImageUrl): ImageUrl {
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

  static fromObject(object: WorkOrderStatus): WorkOrderStatus {
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

  static fromObject(object: WorkOrder): WorkOrder {
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

  static fromObject(object: UserStatus): UserStatus {
    return new UserStatus(object.id)
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

  static fromObject(object: User): User {
    return new User(object.id, object.role, object.name, object.emailAddress, object.streetAddress, object.registered, object.pin)
  }

  static empty(): User {
    return new User(0, '', '', '', '', '', '')
  }
}

const roleInvalidMessage = 'A valid role must be selected.'
const nameInvalidMessage = 'For name, enter at least 2 characters.'
const emailAddressInvalidMessage = 'For email address, enter at least 3 characters to inlcude @.'
const streetAddressInvalidMessage = 'For street address, enter at least 6 characters.'
const pinInvalidMessage = 'For pin, enter exactly 7 numbers, characters and/or symbols.'
const datetimeInvalidMessage = 'For datetime, must use 24-character ISO standard: YYYY-MM-DDTHH:mm:ss.sssZ'
const idInvalidMessage = 'An id must be greater than 0.'
const numberInvalidMessage = 'A number must be greater than 0.'
const definedInvalidMessage = 'This field may be empty, but must be defined.'

function validateRole(role: string) {
  return role === homeowner || role === serviceProvider
}

function validateEmailAddress(emailAddress: string) {
  return validateLengthRange(emailAddress, 3, 128) && emailAddress.includes('@')
}

function validateLength(string: string, length: number) {
  return string.length === length
}

function validateLengthRange(string: string, lower: number, upper: number) {
  return string.length >= lower && string.length <= upper
}

function validateGreaterThanZero(number: number) {
  return number > 0
}

function validateGreaterThanOrEqualZero(number: number) {
  return number >= 0
}

function validateDefined(string: string) {
  let isDefined
  try {
    isDefined = string !== undefined && string !== null && string.length >= 0
  } catch {
    isDefined = false
  }
  return isDefined
}

export function validateRegistration(role: string, name: string, emailAddress: string, streetAddress: string) {
  const errors = []
  if (!validateRole(role)) errors.push(roleInvalidMessage)
  if (!validateLengthRange(name, 2, 64)) errors.push(nameInvalidMessage)
  if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage)
  if (!validateLengthRange(streetAddress, 6, 128)) errors.push(streetAddressInvalidMessage)
  return errors
}

export function validateCredentials(emailAddress: string, pin: string) {
  const errors = []
  if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage)
  if (!validateLength(pin, 7)) errors.push(pinInvalidMessage)
  return errors
}

export function validateWorkOrder(number: number, homeownerId: number, serviceProviderId: number, title: string, issue: string, imageUrl: string, resolution: string, opened: string, closed: string) {
  const errors = []
  if (!validateGreaterThanOrEqualZero(number)) errors.push(numberInvalidMessage)
  if (!validateGreaterThanZero(homeownerId)) errors.push(idInvalidMessage)
  if (!validateGreaterThanZero(serviceProviderId)) errors.push(idInvalidMessage)
  if (!validateLengthRange(title, 4, 64)) errors.push(definedInvalidMessage)
  if (!validateLengthRange(issue, 4, 255)) errors.push(definedInvalidMessage)
  if (!validateDefined(imageUrl)) errors.push(definedInvalidMessage)
  if (!validateDefined(resolution)) errors.push(definedInvalidMessage)
  if (!validateLength(opened, 24)) errors.push(datetimeInvalidMessage)
  if (!validateDefined(closed)) errors.push(definedInvalidMessage)
  return errors
}

export function validateUser(id: number, role: string, name: string, emailAddress: string, streetAddress: string, registered: string) {
  const errors = []
  if (!validateGreaterThanZero(id)) errors.push(idInvalidMessage)
  if (!validateLength(registered, 24)) errors.push(datetimeInvalidMessage)
  errors.concat( validateRegistration(role, name, emailAddress, streetAddress) )
  return errors
}

export function validateUserInfo(name: string, emailAddress: string, streetAddress: string) {
  const errors = []
  if (!validateLengthRange(name, 2, 64)) errors.push(nameInvalidMessage)
  if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage)
  if (!validateLengthRange(streetAddress, 6, 128)) errors.push(streetAddressInvalidMessage)
  return errors
}