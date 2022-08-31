import { newPin } from './pin.js'
import * as store from './store.js'
import * as emailer from './emailer.js'
import {
  serviceProvider,
  Login,
  LoggedIn,
  Register,
  Registered,
  ImageSaved,
  User,
  SaveUser,
  UserSaved,
  SaveWorkOrder,
  WorkOrder,
  WorkOrderSaved,
  WorkOrderSelected,
  WorkOrdersListed
} from './entity.js'

const subjectRegistration = `Work Order Registration`
const textRegistration = `is your new 7-character pin. Use it to login. Print this email and keep it in a safe place. Then delete this email!`

function log(method: string, message:  string): void {
  console.log(`*** service.${method}: %s`, message)
}

export default () => {
  console.log('*** service running ...')
}

export function shutdown(): void {
  store.disconnect()
}

export function register(register: Register): Registered {
  try {
    const pin = newPin()
    const user = new User(0, register.role, register.name, register.emailAddress, register.streetAddress, new Date().toISOString(), pin)
    emailer.send(user.emailAddress, pin, subjectRegistration, textRegistration)
    store.addUser(user)
    log('register', `succeeded for ${register.emailAddress}`)
    return Registered.success(pin)
  } catch (error) {
    log('register', `failed error: ${error} for ${register.emailAddress}`)
    return Registered.fail(`register failed for ${register.emailAddress}`)
  }
}

export function login(login: Login): LoggedIn {
  try {
    const user: User[] = []
    const serviceProviders: User[] = []
    const workOrders: WorkOrder[] = []
    store.getUserByEmailAddressPin(login.emailAddress, login.pin, user)
    store.listUsersByRole(serviceProvider, serviceProviders)
    store.listWorkOrdersByUserId(user[0].id, workOrders)
    log('login', `succeeded for ${login.emailAddress}`)
    return LoggedIn.success(user[0], serviceProviders, workOrders)
  } catch(error) {
    log('login', `failed error: ${error} for ${login.emailAddress}`)
    return LoggedIn.fail(`Login failed for ${login.emailAddress}`)
  }
}

export function listWorkOrdersByUserId(id: number): WorkOrdersListed {
  try {
    const workOrders: WorkOrder[] = []
    store.listWorkOrdersByUserId(id, workOrders)
    log('listWorkOrdersByUserId', `succeeded for user id: ${id}`)
    return WorkOrdersListed.success(id, workOrders)
  } catch(error) {
    log('listWorkOrdersByUserId', `failed error: ${error} for id: ${id}`)
    return WorkOrdersListed.fail(id, 'List work orders by user id failed.')
  }
}

export function getWorkOrderByNumber(number: number): WorkOrderSelected {
  try {
    const workOrder: WorkOrder[] = []
    store.getWorkOrderByNumber(number, workOrder)
    log('getWorkOrderByNumber', `succeeded for number: ${number}`)
    return WorkOrderSelected.success(workOrder[0])
  } catch(error) {
    log('getWorkOrderByNumber', `failed error: ${error} for number: ${number}`)
    return WorkOrderSelected.fail(number, 'Get work order by number failed.')
  }
}

export function addWorkOrder(saveWorkOrder: SaveWorkOrder): WorkOrderSaved {
  try {
    store.addWorkOrder(saveWorkOrder.workOrder)
    log('addWorkOrder', `succeeded for number: ${saveWorkOrder.workOrder.number}`)
    return WorkOrderSaved.success(saveWorkOrder.workOrder.number)
  } catch(error) {
    log('addWorkOrder', `failed: ${error} for ${saveWorkOrder}`)
    return WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Add work order failed.')
  }
}

export function saveWorkOrder(saveWorkOrder: SaveWorkOrder): WorkOrderSaved {
  try {
    store.saveWorkOrder(saveWorkOrder.workOrder)
    log('saveWorkOrder', `succeeded for number: ${saveWorkOrder.workOrder.number}`)
    return WorkOrderSaved.success(saveWorkOrder.workOrder.number)
  } catch(error) {
    log('saveWorkOrder', `failed: ${error} for ${saveWorkOrder}`)
    return WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Save work order failed.')
  }
}

export function saveUser(saveUser: SaveUser): UserSaved {
  try {
    store.saveUser(saveUser.user)
    log('saveUser', `succeeded for id: ${saveUser.user.id}`)
    return UserSaved.success(saveUser.user.id)
  } catch(error) {
    log('saveUser', `failed: ${error} for ${saveUser}`)
    return UserSaved.fail(saveUser.user.id, 'Save user failed.')
  }
}

export function saveImageUrl(number: number, url: string): ImageSaved {
  try {
    store.saveImageUrl(number, url)
    log('saveImageUrl', `succeeded for number: ${number} url: ${url}`)
    return ImageSaved.success(number, url)
  } catch(error) {
    log('saveImageUrl', `failed: for number: ${number} url: ${url} error: ${error}`)
    return ImageSaved.fail(number, url, 'Save image url failed.')
  }
}