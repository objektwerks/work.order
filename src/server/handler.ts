import * as service from './service.js'
import {
  isGreaterThanZero,
  isLoginValid,
  isRegisterValid,
  isUserValid,
  isWorkOrderValid,
  ImageSaved,
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

export async function register(register: Register): Promise<Registered> {
  if (isRegisterValid(register)) return service.register(register)
  else return Registered.fail(`register failed for: ${register.emailAddress}`)
}

export async function login(login: Login): Promise<LoggedIn> {
  if (isLoginValid(login)) return service.login(login)
  else return LoggedIn.fail(`Login failed for: ${login.emailAddress}`)
}

export async function listWorkOrdersByUserId(id: number): Promise<WorkOrdersListed> {
  if (isGreaterThanZero(id)) return service.listWorkOrdersByUserId(id)
  else return WorkOrdersListed.fail(id, 'List work orders by user id failed.')
}

export async function getWorkOrderByNumber(number: number): Promise<WorkOrderSelected> {
  if (isGreaterThanZero(number)) return service.getWorkOrderByNumber(number)
  else return WorkOrderSelected.fail(number, 'Get work order by number failed.')
}

export async function addWorkOrder(saveWorkOrder: SaveWorkOrder): Promise<WorkOrderSaved> {
  if (isWorkOrderValid(saveWorkOrder.workOrder)) return service.addWorkOrder(saveWorkOrder)
  else return WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Add work order failed.')
}

export async function saveWorkOrder(saveWorkOrder: SaveWorkOrder): Promise<WorkOrderSaved> {
  if (isWorkOrderValid(saveWorkOrder.workOrder)) return service.saveWorkOrder(saveWorkOrder)
  return WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Save work order failed.')
}

export async function saveUser(saveUser: SaveUser): Promise<UserSaved> {
  if (isUserValid(saveUser.user)) return service.saveUser(saveUser)
  else return UserSaved.fail(saveUser.user.id, 'Save user failed.')
}

export async function saveImageUrl(number: number, url: string): Promise<ImageSaved> {
  if (isGreaterThanZero(number) && url.startsWith('/images/')) return service.saveImageUrl(number, url)
  else return ImageSaved.fail(number, url, 'Save image url failed.')
}