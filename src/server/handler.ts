import { isLicenseValid } from './cache.js'
import * as service from './service.js'
import {
  isGreaterThanZero,
  isLoginValid,
  isRegisterValid,
  isUserValid,
  isWorkOrderValid,
  Login,
  LoggedIn,
  Register,
  Registered,
  SaveUser,
  UserSaved,
  SaveWorkOrder,
  WorkOrderSaved,
  WorkOrdersListed, 
  ListWorkOrders} from './entity.js'

export default () => {
  console.log('*** handler init ...')
}

export function shutdown(): void {
  service.shutdown()
}

export async function register(register: Register): Promise<Registered> {
  if (isRegisterValid(register)) return service.register(register)
  else return Registered.fail(`Register was invalid.`)
}

export async function login(login: Login): Promise<LoggedIn> {
  if (isLoginValid(login)) return service.login(login)
  else return LoggedIn.fail(`Login was invalid.`)
}

export async function addWorkOrder(saveWorkOrder: SaveWorkOrder): Promise<WorkOrderSaved> {
  if (isLicenseValid(saveWorkOrder.license)) {
    if (isWorkOrderValid(saveWorkOrder.workOrder)) return service.addWorkOrder(saveWorkOrder)
    else return WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Work order was invalid.')
  } else return WorkOrderSaved.fail(saveWorkOrder.workOrder.number, `License invalid: ${saveWorkOrder.license}`)
}

export async function saveWorkOrder(saveWorkOrder: SaveWorkOrder): Promise<WorkOrderSaved> {
  if (isLicenseValid(saveWorkOrder.license)) {
    if (isWorkOrderValid(saveWorkOrder.workOrder)) return service.saveWorkOrder(saveWorkOrder)
    return WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Work order is invalid.')
  } else return WorkOrderSaved.fail(saveWorkOrder.workOrder.number, `License invalid: ${saveWorkOrder.license}`)
}

export async function listWorkOrders(listWorkOrders: ListWorkOrders): Promise<WorkOrdersListed> {
  if (isLicenseValid(listWorkOrders.license)) {
    if (isGreaterThanZero(listWorkOrders.userId)) return service.listWorkOrders(listWorkOrders.userId)
    else return WorkOrdersListed.fail(listWorkOrders.userId, 'User id was invalid.')
  } else return WorkOrdersListed.fail(listWorkOrders.userId, `License invalid: ${listWorkOrders.license}`)
}

export async function saveUser(saveUser: SaveUser): Promise<UserSaved> {
  if (isLicenseValid(saveUser.user.license)) {
    if (isUserValid(saveUser.user)) return service.saveUser(saveUser)
    else return UserSaved.fail(saveUser.user.id, 'User is invalid.')
  } else return UserSaved.fail(saveUser.user.id, `License invalid: ${saveUser.user.license}`)
}