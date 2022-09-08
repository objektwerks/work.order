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
  WorkOrderSelected,
  WorkOrdersListed } from './entity.js'

export default () => {
  console.log('*** handler running ...')
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

export async function listWorkOrdersByUserId(id: number): Promise<WorkOrdersListed> {
  if (isGreaterThanZero(id)) return service.listWorkOrdersByUserId(id)
  else return WorkOrdersListed.fail(id, 'User id was invalid.')
}

export async function getWorkOrderByNumber(number: number): Promise<WorkOrderSelected> {
  if (isGreaterThanZero(number)) return service.getWorkOrderByNumber(number)
  else return WorkOrderSelected.fail(number, 'Work order number was invalid.')
}

export async function addWorkOrder(saveWorkOrder: SaveWorkOrder): Promise<WorkOrderSaved> {
  if (isWorkOrderValid(saveWorkOrder.workOrder)) return service.addWorkOrder(saveWorkOrder)
  else return WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Work order was invalid.')
}

export async function saveWorkOrder(saveWorkOrder: SaveWorkOrder): Promise<WorkOrderSaved> {
  if (isWorkOrderValid(saveWorkOrder.workOrder)) return service.saveWorkOrder(saveWorkOrder)
  return WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Work order is invalid.')
}

export async function saveUser(saveUser: SaveUser): Promise<UserSaved> {
  if (isUserValid(saveUser.user)) return service.saveUser(saveUser)
  else return UserSaved.fail(saveUser.user.id, 'User is invalid.')
}