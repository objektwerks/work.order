// @ts-check
import { newPin } from './pin.js'
import * as store from './store.js'
import * as emailer from './emailer.js'
import {
  serviceProvider,
  Credentials,
  ImageUrl,
  User,
  UsersWorkOrders,
  WorkOrder,
  WorkOrders,
  Registration
} from '../shared/entity.js'

const subjectRegistration = `Work Order Registration`
const textRegistration = `is your new 7-character pin. Use it to login. Print this email and keep it in a safe place. Then delete this email!`

function log(method: string, message:  string) {
  console.log('*** service.${method}: ', message)
}

export default () => {
  console.log('*** service running ...')
}

export function shutdown() {
  store.disconnect()
}

export function register(registration: Registration) {
  let status
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

export function login(credentials: Credentials) {
  let status
  try {
    const user: User = store.getUserByEmailAddressPin(credentials.emailAddress, credentials.pin)
    if (Object.entries(user).length > 0) {
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

export function listWorkOrdersByUserId(id: number) {
  let status
  try {
    const list = store.listWorkOrdersByUserId(id)
    status = WorkOrders.success(list)
    log('listWorkOrdersByUserId', `succeeded for user id: ${id}`)
  } catch(error) {
    status = WorkOrders.fail('List work orders by user id failed.')
    log('listWorkOrdersByUserId', `failed error: ${error} for id: ${id}`)
  }
  return status
}

export function getWorkOrderByNumber(number: number) {
  let status
  try {
    const workOrder = store.getWorkOrderByNumber(number)
    if (Object.entries(workOrder).length > 0) {
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

export function addWorkOrder(workOrder: WorkOrder) {
  let status
  try {
    const number = store.addWorkOrder(workOrder)
    workOrder.number = number
    status = WorkOrder.success(workOrder)
    log('addWorkOrder', `succeeded for number: ${number}`)
  } catch(error) {
    status = WorkOrder.fail('Add work order failed.', workOrder.number)
    log('addWorkOrder', `failed: ${error} for ${workOrder}`)
  }
  return status
}

export function saveWorkOrder(workOrder: WorkOrder) {
  let status
  try {
    const count = store.saveWorkOrder(workOrder)
    if (count > 0) {
      status = WorkOrder.success(workOrder)
      log('saveWorkOrder', `succeeded for number: ${workOrder.number}`)
    } else {
      status = WorkOrder.fail('Save work order failed.', workOrder.number)
      log('saveWorkOrder', `failed for ${workOrder}`)
    }
  } catch(error) {
    status = WorkOrder.fail('Save work order failed.', workOrder.number)
    log('saveWorkOrder', `failed: ${error} for ${workOrder}`)
  }
  return status
}

export function saveUser(user: User) {
  let status
  try {
    const count = store.saveUser(user)
    if (count > 0) {
      status = User.success(user)
      log('saveUser', `succeeded for id: ${user.id}`)
    } else {
      status = User.fail('Save user failed.', user.emailAddress)
      log('saveUser', `failed for ${user}`)
    }
  } catch(error) {
    status = User.fail('Save user failed.', user.emailAddress)
    log('saveUser', `failed: ${error} for ${user}`)
  }
  return status
}

export function saveImageUrl(number: number, url: string) {
  let status
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