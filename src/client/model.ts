import { IdValue, setListIdValues, setSelectIdValues, setValueById } from './common.js'
import { User, WorkOrder } from '../shared/entity.js'

let user: User
let serviceProviders: User[]
let workOrders: WorkOrder[]

function splitWorkOrders(workOrders: WorkOrder[], openedWorkOrdersListId: string, closedWorkOrdersListId: string): void {
  const openedWorkOrders = workOrders
    .filter((workOrder) => workOrder.closed.length === 0) // opened
    .map((workOrder) => { return new IdValue(workOrder.number.toString(), workOrder.title) })
  const closedWorkOrders = workOrders
    .filter((workorder) => workorder.closed.length > 0) // closed
    .map((workOrder) => { return new IdValue(workOrder.number.toString(), workOrder.title) })
  setListIdValues(openedWorkOrdersListId, openedWorkOrders)
  setListIdValues(closedWorkOrdersListId, closedWorkOrders)
}

export default () => {
  console.log('*** model init ...')
}

export function getUserId(): number {
  return user.id
}

export function getUserRole(): string {
  return user.role
}

export function getUser(): User {
  return user
}

export function setUser(name: string, emailAddress: string, streetAddress: string): void {
  user.name = name
  user.emailAddress = emailAddress
  user.streetAddress = streetAddress
}

export function getWorkOrderByNumber(number: number): WorkOrder {
  const workOrder = workOrders.find(workOrder => workOrder.number === number)
  return workOrder !== undefined ? workOrder : WorkOrder.empty()
}

export function addWorkOrder(workOrder: WorkOrder) {
  workOrders.push(workOrder)
  const sortedWorkOrders = workOrders.sort((a, b) => Date.parse(b.opened) - Date.parse(a.opened))
  splitWorkOrders(sortedWorkOrders, 'workorders-list-opened-id', 'workorders-list-closed-id')
}

export function bindUserToForm(newUser: User): void {
  user = newUser
  setValueById('user-role-id', user.role)
  setValueById('user-name-id', user.name)
  setValueById('user-email-address-id', user.emailAddress)
  setValueById('user-street-address-id', user.streetAddress)
  setValueById('user-registered-id', user.registered)
}

export function bindServiceProvidersToSelect(newServiceProviders: User[]): void {
  serviceProviders = newServiceProviders
  const idvalues: IdValue[] = []
  for (const serviceProvider of serviceProviders) {
    idvalues.push({ id: serviceProvider.id.toString(), value: serviceProvider.name })
  }
  setSelectIdValues('workorder-service-provider-id', idvalues)
}

export function bindWorkOrdersToList(newWorkOrders: WorkOrder[]): void {
  workOrders = newWorkOrders
  splitWorkOrders(workOrders, 'workorders-list-opened-id', 'workorders-list-closed-id')
}