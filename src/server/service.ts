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

export async function register(register: Register): Promise<Registered> {
  let registered: Registered
  try {
    const pin = newPin()
    const user = new User(0, register.role, register.name, register.emailAddress, register.streetAddress, new Date().toISOString(), pin)
    emailer.send(user.emailAddress, pin, subjectRegistration, textRegistration)
    const id = await store.addUser(user)
    if (id > 0) {
      log('register', `succeeded for: ${register.emailAddress}`)
      registered = Registered.success(pin)
    } else {
      log('register', `failed for: ${register.emailAddress}`)
      registered = Registered.fail(`Register failed for: ${register.emailAddress}`)
    }
  } catch (error) {
    log('register', `failed error: ${error} for: ${register.emailAddress}`)
    registered = Registered.fail(`register failed for: ${register.emailAddress}`)
  }
  return registered
}

export async function login(login: Login): Promise<LoggedIn> {
  try {
    const user = await store.getUserByEmailAddressPin(login.emailAddress, login.pin)
    const serviceProviders = await store.listUsersByRole(serviceProvider)
    const workOrders = await store.listWorkOrdersByUserId(user.id)
    log('login', `succeeded for: ${login.emailAddress}`)
    return LoggedIn.success(user, serviceProviders, workOrders)
  } catch(error) {
    log('login', `failed error: ${error} for: ${login.emailAddress}`)
    return LoggedIn.fail(`Login failed for: ${login.emailAddress}`)
  }
}

export async function listWorkOrdersByUserId(id: number): Promise<WorkOrdersListed> {
  try {
    const workOrders = await store.listWorkOrdersByUserId(id)
    log('listWorkOrdersByUserId', `succeeded for user id: ${id}`)
    return WorkOrdersListed.success(id, workOrders)
  } catch(error) {
    log('listWorkOrdersByUserId', `failed error: ${error} for id: ${id}`)
    return WorkOrdersListed.fail(id, 'List work orders by user id failed.')
  }
}

export async function getWorkOrderByNumber(number: number): Promise<WorkOrderSelected> {
  let selected: WorkOrderSelected
  try {
    const workOrder = await store.getWorkOrderByNumber(number)
    if (workOrder.number > 0) {
      log('getWorkOrderByNumber', `succeeded for number: ${number}`)
      selected = WorkOrderSelected.success(workOrder)
    } else {
      log('getWorkOrderByNumber', `failed for number: ${number}`)
      selected = WorkOrderSelected.fail(number, `Get work order by number failed for number: ${number}`)
    }
  } catch(error) {
    log('getWorkOrderByNumber', `failed error: ${error} for number: ${number}`)
    selected = WorkOrderSelected.fail(number, 'Get work order by number failed.')
  }
  return selected
}

export async function addWorkOrder(saveWorkOrder: SaveWorkOrder): Promise<WorkOrderSaved> {
  let added: WorkOrderSaved
  let number: number = 0
  try {
    number = await store.addWorkOrder(saveWorkOrder.workOrder)
    if (number > 0) {
      log('addWorkOrder', `succeeded for number: ${number}`)
      added = WorkOrderSaved.success(saveWorkOrder.workOrder.number)
    } else {
      log('addWorkOrder', `failed for: ${saveWorkOrder}`)
      added = WorkOrderSaved.fail(number, 'Add work order failed.')
    }
  } catch(error) {
    log('addWorkOrder', `failed: ${error} for ${saveWorkOrder}`)
    added = WorkOrderSaved.fail(number, 'Add work order failed.')
  }
  return added
}

export async function saveWorkOrder(saveWorkOrder: SaveWorkOrder): Promise<WorkOrderSaved> {
  let saved: WorkOrderSaved
  try {
    const affectedRows = await store.saveWorkOrder(saveWorkOrder.workOrder)
    if (affectedRows === 1) {
      log('saveWorkOrder', `succeeded for number: ${saveWorkOrder.workOrder.number}`)
      saved = WorkOrderSaved.success(saveWorkOrder.workOrder.number)
    } else {
      log('saveWorkOrder', `failed for number: ${saveWorkOrder.workOrder.number}`)
      saved = WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Saved work order failed.')
    }
  } catch(error) {
    log('saveWorkOrder', `failed: ${error} for ${saveWorkOrder}`)
    saved = WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Save work order failed.')
  }
  return saved
}

export async function saveUser(saveUser: SaveUser): Promise<UserSaved> {
  let saved: UserSaved
  try {
    const affectedRows = await store.saveUser(saveUser.user)
    if (affectedRows === 1) {
      log('saveUser', `succeeded for id: ${saveUser.user.id}`)
      saved = UserSaved.success(saveUser.user.id)
    } else {
      log('saveUser', `failed for id: ${saveUser.user.id}`)
      saved = UserSaved.fail(saveUser.user.id, 'Save user failed.')
    }
  } catch(error) {
    log('saveUser', `failed: ${error} for ${saveUser}`)
    saved = UserSaved.fail(saveUser.user.id, 'Save user failed.')
  }
  return saved
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