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

export function register(register: Register): Registered {
  let registered: Registered
  try {
    const pin = newPin()
    let id = 0
    const user = new User(id, register.role, register.name, register.emailAddress, register.streetAddress, new Date().toISOString(), pin)
    emailer.send(user.emailAddress, pin, subjectRegistration, textRegistration)
    id = store.addUser(user)
    if (id > 0) {
      registered = Registered.success(pin)
      log('register', `succeeded for ${register.emailAddress}`)
    } else {
      registered = Registered.fail(`Register failed for ${register.emailAddress}`)
      log('register', `failed for: ${register.emailAddress}`)
    }
  } catch (error) {
    registered = Registered.fail(`register failed for ${register.emailAddress}`)
    log('register', `failed error: ${error} for ${register.emailAddress}`)
  }
  return registered
}

export function login(login: Login): LoggedIn {
  let loggedIn: LoggedIn
  try {
    const user: User = store.getUserByEmailAddressPin(login.emailAddress, login.pin)
    if (user.id > 0) {
      const serviceProviders = store.listUsersByRole(serviceProvider)
      const workOrders = store.listWorkOrdersByUserId(user.id)
      loggedIn = LoggedIn.success(user, serviceProviders, workOrders)
      log('login', `succeeded for ${login.emailAddress}`)
    } else {
      loggedIn = LoggedIn.fail(`Login failed for ${login.emailAddress}`)
      log('login', `failed for ${login.emailAddress}`)
    }
  } catch(error) {
    loggedIn = LoggedIn.fail(`Login failed for ${login.emailAddress}`)
    log('login', `failed error: ${error} for ${login.emailAddress}`)
  }
  return loggedIn
}

export function listWorkOrdersByUserId(id: number): WorkOrdersListed {
  let listed: WorkOrdersListed
  try {
    const list = store.listWorkOrdersByUserId(id)
    listed = WorkOrdersListed.success(id, list)
    log('listWorkOrdersByUserId', `succeeded for user id: ${id}`)
  } catch(error) {
    listed = WorkOrdersListed.fail(id, 'List work orders by user id failed.')
    log('listWorkOrdersByUserId', `failed error: ${error} for id: ${id}`)
  }
  return listed
}

export function getWorkOrderByNumber(number: number): WorkOrderSelected {
  let selected: WorkOrderSelected
  try {
    const workOrder = store.getWorkOrderByNumber(number)
    if (workOrder.number === 0) {
      selected = WorkOrderSelected.success(workOrder)
      log('getWorkOrderByNumber', `succeeded for number: ${number}`)
    } else {
      selected = WorkOrderSelected.fail(number, 'Get work order by number failed.')
      log('getWorkOrderByNumber', `succeeded for number: ${number}`)
    }
  } catch(error) {
    selected = WorkOrderSelected.fail(number, 'Get work order by number failed.')
    log('getWorkOrderByNumber', `failed error: ${error} for number: ${number}`)
  }
  return selected
}

export function addWorkOrder(saveWorkOrder: SaveWorkOrder): WorkOrderSaved {
  let added: WorkOrderSaved
  try {
    const number = store.addWorkOrder(saveWorkOrder.workOrder)
    saveWorkOrder.workOrder.number = number
    added = WorkOrderSaved.success(saveWorkOrder.workOrder.number)
    log('addWorkOrder', `succeeded for number: ${number}`)
  } catch(error) {
    added = WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Add work order failed.')
    log('addWorkOrder', `failed: ${error} for ${saveWorkOrder}`)
  }
  return added
}

export function saveWorkOrder(saveWorkOrder: SaveWorkOrder): WorkOrderSaved {
  let saved: WorkOrderSaved
  try {
    const count = store.saveWorkOrder(saveWorkOrder.workOrder)
    if (count > 0) {
      saved = WorkOrderSaved.success(saveWorkOrder.workOrder.number)
      log('saveWorkOrder', `succeeded for number: ${saveWorkOrder.workOrder.number}`)
    } else {
      saved = WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Save work order failed.')
      log('saveWorkOrder', `failed for ${saveWorkOrder}`)
    }
  } catch(error) {
    saved = WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Save work order failed.')
    log('saveWorkOrder', `failed: ${error} for ${saveWorkOrder}`)
  }
  return saved
}

export function saveUser(saveUser: SaveUser): UserSaved {
  let saved: UserSaved
  try {
    const count = store.saveUser(saveUser.user)
    if (count > 0) {
      saved = UserSaved.success(saveUser.user.id)
      log('saveUser', `succeeded for id: ${saveUser.user.id}`)
    } else {
      saved = UserSaved.fail(saveUser.user.id, 'Save user failed.')
      log('saveUser', `failed for ${saveUser}`)
    }
  } catch(error) {
    saved = UserSaved.fail(saveUser.user.id, 'Save user failed.')
    log('saveUser', `failed: ${error} for ${saveUser}`)
  }
  return saved
}

export function saveImageUrl(number: number, url: string): ImageSaved {
  let saved: ImageSaved
  try {
    const count = store.saveImageUrl(number, url)
    if (count > 0) {
      saved = ImageSaved.success(number, url)
      log('saveImageUrl', `succeeded for number: ${number} url: ${url}`)
    } else {
      saved = ImageSaved.fail(number, url, 'Save image url failed.')
      log('saveImageUrl', `failed for number: ${number} url: ${url}`)
    }
  } catch(error) {
    saved = ImageSaved.fail(number, url, 'Save image url failed.')
    log('saveImageUrl', `failed: for number: ${number} url: ${url} error: ${error}`)
  }
  return saved
}