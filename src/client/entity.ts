/**
 * The code sharing story in the web space is not ideal. Hence the interim
 * need for this shared file of roles, json-object, commands, events, entities
 * and validators.
 */

// Roles
export const homeowner = 'homeowner'
export const serviceProvider = 'serviceprovider'

// Json-Object
export function toJson<T>(object: T): string {
  console.log('*** toJson object: ', object)
  return JSON.stringify(object)
}

export function toObject<T>(json: string): T {
  console.log('*** toObject json: ', json)
  return JSON.parse(json)
}

// Commands
export class Register {
  constructor(public role: string, 
              public name: string, 
              public emailAddress: string, 
              public streetAddress: string) {}
}

export class Login {
  constructor(public emailAddress: string, 
              public pin: string) {}
}

export class SaveWorkOrder {
  constructor(workOrder: WorkOrder) {}
}

export class SaveUser {
  constructor(public user: User) {}
}

// Events
export class Registered {
  constructor(public pin: string,
              public success: boolean = true,
              public error: string = '') {}

  static success(pin: string): Registered {
    return new Registered(pin)
  }
  
  static fail(error: string): Registered {
    return new Registered('', false, error)
  }
}

export class LoggedIn {
  constructor(public user: User, 
              public serviceProviders: User[], 
              public workOrders: WorkOrder[], 
              public success: boolean = true, 
              public error: string = '') {}

  static success(user: User, serviceProviders: User[], workOrders: WorkOrder[]): LoggedIn {
    return new LoggedIn(user, serviceProviders, workOrders)  
  }

  static fail(error: string): LoggedIn {
    return new LoggedIn(User.empty(), [], [], false, error)
  }
}

export class WorkOrderSaved {
  constructor(public number: number,
              public success: boolean = true,
              public error: string = '') {}

  static success(number: number): WorkOrderSaved {
    return new WorkOrderSaved(number)
  }
  
  static fail(number: number, error: string): WorkOrderSaved {
    return new WorkOrderSaved(number, false, error)
  }
}

export class WorkOrderSelected {
  constructor(public number: number,
              public workOrder: WorkOrder, 
              public success: boolean = true, 
              public error: string = '') {}

  static success(workOrder: WorkOrder): WorkOrderSelected {
    return new WorkOrderSelected(workOrder.number, workOrder)
  }

  static fail(number: number, error: string): WorkOrderSelected {
    return new WorkOrderSelected(number, WorkOrder.empty(), false, error)
  }
}

export class WorkOrdersListed {
  constructor(public userId: number, 
              public workOrders: WorkOrder[], 
              public success: boolean = true, 
              public error: string = '') {}

  static success(userId: number, workOrders: WorkOrder[]): WorkOrdersListed {
    return new WorkOrdersListed(userId, workOrders)
  }

  static fail(userId: number, error: string): WorkOrdersListed {
    return new WorkOrdersListed(userId, [WorkOrder.empty()], false, error)
  }
}

export class ImageSaved {
  constructor(public number: number, 
              public url: string, 
              public success: boolean = true, 
              public error: string = '') {}

  static success(number: number, url: string): ImageSaved {
    return new ImageSaved(number, url)
  }

  static fail(number: number, url: string, error: string): ImageSaved {
    return new ImageSaved(number, url, false, error)
  }
}

export class UserSaved {
  constructor(public id: number, 
              public success: boolean = true, 
              public error: string = '') {}

  static success(id: number): UserSaved {
    return new UserSaved(id)
  }

  static fail(id: number, error: string): UserSaved {
    return new UserSaved(id, false, error)
  }
}

// Entities
export class WorkOrder {
  constructor(public number: number,
              public homeownerId: number, 
              public serviceProviderId: number, 
              public title: string, 
              public issue: string, 
              public imageUrl: string, 
              public resolution: string, 
              public opened: string, 
              public closed: string) {}

  static empty(): WorkOrder {
    return new WorkOrder(0, 0, 0, '', '', '', '', '', '')
  }
}

export class User {
  constructor(public id: number, 
              public role: string, 
              public name: string, 
              public emailAddress: string, 
              public streetAddress: string, 
              public registered: string, 
              public pin: string) {}

  static empty(): User {
    return new User(0, '', '', '', '', '', '')
  }
}

// Validators
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

export function validateRegister(role: string, name: string, emailAddress: string, streetAddress: string) {
  const errors = []
  if (!validateRole(role)) errors.push(roleInvalidMessage)
  if (!validateLengthRange(name, 2, 64)) errors.push(nameInvalidMessage)
  if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage)
  if (!validateLengthRange(streetAddress, 6, 128)) errors.push(streetAddressInvalidMessage)
  return errors
}

export function validateLogin(emailAddress: string, pin: string) {
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
  errors.concat( validateRegister(role, name, emailAddress, streetAddress) )
  return errors
}

export function validateUserInfo(name: string, emailAddress: string, streetAddress: string) {
  const errors = []
  if (!validateLengthRange(name, 2, 64)) errors.push(nameInvalidMessage)
  if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage)
  if (!validateLengthRange(streetAddress, 6, 128)) errors.push(streetAddressInvalidMessage)
  return errors
}