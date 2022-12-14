import { newPin } from './pin.js'
import * as cache from './cache.js'
import * as store from './store.js'
import * as emailer from './emailer.js'
import { logger } from './logger.js'
import {
  serviceProvider,
  Login,
  LoggedIn,
  Register,
  Registered,
  User,
  SaveUser,
  UserSaved,
  SaveWorkOrder,
  WorkOrderSaved,
  WorkOrdersListed
} from './entity.js'

const subjectRegistration = 'Work Order Registration'
const subjectNotification = 'Work Order Notification'

function log(method: string, message:  string): void {
  logger.info(`*** service.${method}: ${message}`)
}

function logError(method: string, message:  string): void {
  logger.error(`*** service.${method} error: ${message}`)
}

export default () => {
  console.log('*** service init ...')
}

export function shutdown(): void {
  store.disconnect()
}

export async function register(register: Register): Promise<Registered> {
  let registered: Registered
  const pin = newPin()
  try {
    const user = new User(0, register.role, register.name, register.emailAddress, register.streetAddress, new Date().toISOString(), pin, '')
    const html = `<p>Your new 7-character pin is: <b>${pin}</b> Use it to login. Print this email, keep it in a safe place and <b>delete it!</b></p>`
    await emailer.send(user.emailAddress, subjectRegistration, html)
    const id = await store.addUser(user)
    if (id > 0) {
      log('register', `succeeded for: ${register.emailAddress}`)
      registered = Registered.success(pin)
    } else {
      log('register', `failed for: ${register.emailAddress}`)
      registered = Registered.fail(`Register failed for: ${register.emailAddress}`)
    }
  } catch (error) {
    logError('register', `failed error: ${error} for: ${register.emailAddress}`)
    registered = Registered.fail(`Register failed for: ${register.emailAddress}`)
  }
  return registered
}

/*
 Refactor ts login accordingly. Also see store.
  /**
   *  user.role == service provider:
   *    don't list service providers
   *    list all homeowners in assigned work orders to a single service provider
   *  user.role == homeowner:
   *    don't list homeowners
   *    list all service providers
   */
  /*
   def login(login: Login): LoggedIn =
   Try {
     val user = store.getUserByEmailAddressPin(login.emailAddress, login.pin).get
     val users = user.role match
       case Roles.serviceProvider => store.listHomeownersInWorkOrdersByServiceProviderId(user.id)
       case Roles.homeowner => store.listServiceProviders()
     val workOrders = store.listWorkOrders(user.id)
     log("login", s"succeeded for: ${login.emailAddress}")
     LoggedIn.success(user, users, workOrders)
   }.recover { case error =>
     logError("login", s"failed error: $error for: ${login.emailAddress}")
     LoggedIn.fail(s"Login failed for: ${login.emailAddress}")
   }.get
*/
export async function login(login: Login): Promise<LoggedIn> {
  let loggedIn: LoggedIn
  try {
    const user = await store.getUserByEmailAddressPin(login.emailAddress, login.pin)
    const serviceProviders = await store.listUsersByRole(serviceProvider)
    const workOrders = await store.listWorkOrders(user.id)
    log('login', `succeeded for: ${login.emailAddress}`)
    loggedIn = LoggedIn.success(user, serviceProviders, workOrders)
    cache.addLicense(user.license)
  } catch(error) {
    logError('login', `failed error: ${error} for: ${login.emailAddress}`)
    loggedIn = LoggedIn.fail(`Login failed for: ${login.emailAddress}`)
  }
  return loggedIn
}

export async function addWorkOrder(saveWorkOrder: SaveWorkOrder): Promise<WorkOrderSaved> {
  let added: WorkOrderSaved
  let number = 0
  try {
    number = await store.addWorkOrder(saveWorkOrder.workOrder)
    if (number > 0) {
      log('addWorkOrder', `succeeded for number: ${number}`)
      added = WorkOrderSaved.success(number)
      const html = `<p>A new work order, number <b>${number}</b>, has been opened.</p>`
      store.listEmailAddressesByIds(saveWorkOrder.workOrder.homeownerId, saveWorkOrder.workOrder.serviceProviderId).then(emailAddresses => {
        emailer.send(emailAddresses, subjectNotification, html)
      })
    } else {
      log('addWorkOrder', `failed for: ${saveWorkOrder}`)
      added = WorkOrderSaved.fail(number, 'Add work order failed.')
    }
  } catch(error) {
    logError('addWorkOrder', `failed error: ${error} for: ${saveWorkOrder}`)
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
      const updatedOrClosed = saveWorkOrder.workOrder.closed.length === 0 ? 'updated' : 'closed'
      const html = `<p>Open work order, number <b>${saveWorkOrder.workOrder.number}</b>, has been ${updatedOrClosed}.</p>`
      store.listEmailAddressesByIds(saveWorkOrder.workOrder.homeownerId, saveWorkOrder.workOrder.serviceProviderId).then(emailAddresses => {
        emailer.send(emailAddresses, subjectNotification, html)
      })
    } else {
      log('saveWorkOrder', `failed for number: ${saveWorkOrder.workOrder.number}`)
      saved = WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Saved work order failed.')
    }
  } catch(error) {
    logError('saveWorkOrder', `failed error: ${error} for: ${saveWorkOrder}`)
    saved = WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Save work order failed.')
  }
  return saved
}

export async function listWorkOrders(userId: number): Promise<WorkOrdersListed> {
  try {
    const workOrders = await store.listWorkOrders(userId)
    log('listWorkOrders', `succeeded for user id: ${userId}`)
    return WorkOrdersListed.success(userId, workOrders)
  } catch(error) {
    logError('listWorkOrders', `failed error: ${error} for user id: ${userId}`)
    return WorkOrdersListed.fail(userId, 'List work orders failed.')
  }
}

export async function saveUser(saveUser: SaveUser): Promise<UserSaved> {
  let saved: UserSaved
  try {
    const affectedRows = await store.saveUser(saveUser.user)
    if (affectedRows === 1) {
      log('saveUser', `succeeded for user id: ${saveUser.user.id}`)
      saved = UserSaved.success(saveUser.user.id)
    } else {
      log('saveUser', `failed for user id: ${saveUser.user.id}`)
      saved = UserSaved.fail(saveUser.user.id, 'Save user failed.')
    }
  } catch(error) {
    logError('saveUser', `failed error: ${error} for: ${saveUser}`)
    saved = UserSaved.fail(saveUser.user.id, 'Save user failed.')
  }
  return saved
}