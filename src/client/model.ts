import * as binder from './binder.js'
import { User, WorkOrder } from './entity.js'

let user: User
let serviceProviders: User[]
let workOrders: WorkOrder[]
let imageFile: ImageFile[] // length of 0 or 1

export class ImageFile {
  constructor(public number: number, public file: File, public filename: string, public url: string) {}
}

export default () => {
  console.log('*** model init ...')
}

export function getLicense() {
  return user.license
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

export function setUser(newUser: User): void {
  user = newUser
}

export function setUserFields(name: string, emailAddress: string, streetAddress: string): void {
  user.name = name
  user.emailAddress = emailAddress
  user.streetAddress = streetAddress
}

export function getServiceProviders(): User[] {
  return serviceProviders
}

export function setServiceProviders(newServiceProviders: User[]): void {
  serviceProviders = newServiceProviders
}

export function getWorkOrders(): WorkOrder[] {
  return workOrders
}

export function getWorkOrderByNumber(number: number): WorkOrder | undefined {
  return workOrders.find(workOrder => workOrder.number === number)
}

export function addWorkOrder(workOrder: WorkOrder): void {
  workOrders.push(workOrder)
  const sortedWorkOrders = workOrders.sort((a, b) => Date.parse(b.opened) - Date.parse(a.opened))
  binder.splitWorkOrders(sortedWorkOrders)
}

export function setWorkOrders(newWorkOrders: WorkOrder[]): void {
  workOrders = newWorkOrders
}

export function getImageFile(): ImageFile[] {
  return imageFile
}

export function setImageFile(newImageFile: ImageFile): void {
  imageFile = []
  imageFile.push(newImageFile)
}