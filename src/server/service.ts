import { newPin } from './pin'
import * as store from './store'
import * as emailer from './emailer'
import {
  serviceProvider,
  Credentials,
  ImageUrl,
  Status,
  User,
  UserStatus,
  UsersWorkOrders,
  WorkOrder,
  WorkOrderStatus,
  WorkOrders,
  Registration
} from '../shared/entity'

const subjectRegistration = `Work Order Registration`
const textRegistration = `is your new 7-character pin. Use it to login. Print this email and keep it in a safe place. Then delete this email!`

function log(method: string, message:  string): void {
  console.log('*** service.${method}: ', message)
}

export default () => {
  console.log('*** service running ...')
}

export function shutdown(): void {
  store.disconnect()
}

export function register(registration: Registration): Status {
  let status: Status
  try {
    const pin = newPin()
    let id = 0
    const registered = new Date().toISOString()
    const user = new User(id, registration.role, registration.name, registration.emailAddress, registration.streetAddress, registered, pin)
    emailer.send(user.emailAddress, pin, subjectRegistration, textRegistration)
    id = store.addUser(user)
    if (id > 0) {
      status = Registration.success()
      log('register', `succeeded for ${registration.emailAddress}`)
    } else {
      status = Registration.fail(`Register failed for ${registration.emailAddress}`)
      log('register', `failed for: ${registration.emailAddress}`)
    }
  } catch (error) {
    status = Registration.fail(`register failed for ${registration.emailAddress}`)
    log('register', `failed error: ${error} for ${registration.emailAddress}`)
  }
  return status
}

export function login(credentials: Credentials): UsersWorkOrders {
  let status: UsersWorkOrders
  try {
    const user: User = store.getUserByEmailAddressPin(credentials.emailAddress, credentials.pin)
    if (user.id === 0) {
      const serviceProviders = store.listUsersByRole(serviceProvider)
      const workOrders = store.listWorkOrdersByUserId(user.id)
      status = UsersWorkOrders.success(user, serviceProviders, workOrders)
      log('login', `succeeded for ${credentials.emailAddress}`)
    } else {
      status = UsersWorkOrders.fail(`Login failed for ${credentials.emailAddress}`)
      log('login', `failed for ${credentials.emailAddress}`)
    }
  } catch(error) {
    status = UsersWorkOrders.fail(`Login failed for ${credentials.emailAddress}`)
    log('login', `failed error: ${error} for ${credentials.emailAddress}`)
  }
  return status
}

export function listWorkOrdersByUserId(id: number): WorkOrders {
  let status: WorkOrders
  try {
    const list = store.listWorkOrdersByUserId(id)
    status = WorkOrders.success(id, list)
    log('listWorkOrdersByUserId', `succeeded for user id: ${id}`)
  } catch(error) {
    status = WorkOrders.fail('List work orders by user id failed.', id)
    log('listWorkOrdersByUserId', `failed error: ${error} for id: ${id}`)
  }
  return status
}

export function getWorkOrderByNumber(number: number): WorkOrder {
  let status: WorkOrder
  try {
    const workOrder = store.getWorkOrderByNumber(number)
    if (workOrder.number === 0) {
      status = WorkOrder.success(workOrder)
      log('getWorkOrderByNumber', `succeeded for number: ${number}`)
    } else {
      status = WorkOrder.fail('Get work order by number failed.', number)
      log('getWorkOrderByNumber', `succeeded for number: ${number}`)
    }
  } catch(error) {
    status = WorkOrder.fail('Get work order by number failed.', number)
    log('getWorkOrderByNumber', `failed error: ${error} for number: ${number}`)
  }
  return status
}

export function addWorkOrder(workOrder: WorkOrder): WorkOrderStatus {
  let status: WorkOrderStatus
  try {
    const number = store.addWorkOrder(workOrder)
    workOrder.number = number
    status = WorkOrderStatus.success(workOrder.number)
    log('addWorkOrder', `succeeded for number: ${number}`)
  } catch(error) {
    status = WorkOrderStatus.fail('Add work order failed.', workOrder.number)
    log('addWorkOrder', `failed: ${error} for ${workOrder}`)
  }
  return status
}

export function saveWorkOrder(workOrder: WorkOrder): WorkOrderStatus {
  let status: WorkOrderStatus
  try {
    const count = store.saveWorkOrder(workOrder)
    if (count > 0) {
      status = WorkOrderStatus.success(workOrder.number)
      log('saveWorkOrder', `succeeded for number: ${workOrder.number}`)
    } else {
      status = WorkOrderStatus.fail('Save work order failed.', workOrder.number)
      log('saveWorkOrder', `failed for ${workOrder}`)
    }
  } catch(error) {
    status = WorkOrderStatus.fail('Save work order failed.', workOrder.number)
    log('saveWorkOrder', `failed: ${error} for ${workOrder}`)
  }
  return status
}

export function saveUser(user: User): UserStatus {
  let status: UserStatus
  try {
    const count = store.saveUser(user)
    if (count > 0) {
      status = UserStatus.success(user.id)
      log('saveUser', `succeeded for id: ${user.id}`)
    } else {
      status = UserStatus.fail('Save user failed.', user.id)
      log('saveUser', `failed for ${user}`)
    }
  } catch(error) {
    status = UserStatus.fail('Save user failed.', user.id)
    log('saveUser', `failed: ${error} for ${user}`)
  }
  return status
}

export function saveImageUrl(number: number, url: string): ImageUrl {
  let status: ImageUrl
  try {
    const count = store.saveImageUrl(number, url)
    if (count > 0) {
      status = ImageUrl.success(number, url)
      log('saveImageUrl', `succeeded for number: ${number} url: ${url}`)
    } else {
      status = ImageUrl.fail('Save image url failed.', number, url)
      log('saveImageUrl', `failed for number: ${number} url: ${url}`)
    }
  } catch(error) {
    status = ImageUrl.fail('Save image url failed.', number, url)
    log('saveImageUrl', `failed: for number: ${number} url: ${url} error: ${error}`)
  }
  return status
}