import { IdValue, setListIdValues, setSelectIdValues, setValueById } from './dom.js'
import { User, WorkOrder } from './entity.js'

let user: User
let serviceProviders: User[]
let workOrders: WorkOrder[]
let imageFile: ImageFile[] // array of 1, or option

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

export class ImageFile {
  constructor(public number: number, public file: File, public filename: string, public url: string) {}
}

export default () => {
  console.log('*** model init ...')
}

export function getImageFile(): ImageFile[] {
  return imageFile
}

export function resetImageFile(): void {
  imageFile = []
}

export function setImageFile(newImageFile: ImageFile): void {
  imageFile = []
  imageFile.push(newImageFile)
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

export function getWorkOrderByNumber(number: number): WorkOrder | undefined {
  return workOrders.find(workOrder => workOrder.number === number)
}

export function addWorkOrder(workOrder: WorkOrder): void {
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