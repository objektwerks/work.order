import * as model from './model.js'
import { User, WorkOrder } from './entity.js'
import { IdValue, setImageUrlById, setImageUrlHrefById, setListIdValues, setSelectIdValues, setSelectOptionById, setCheckBoxById, setValueById } from './dom.js'

export default () => {
  console.log('*** binder init ...')
}

export function splitWorkOrders(workOrders: WorkOrder[]): void {
  const openedWorkOrders = workOrders
    .filter((workOrder) => workOrder.closed.length === 0) // opened
    .map((workOrder) => { return new IdValue(workOrder.number.toString(), workOrder.title) })
  const closedWorkOrders = workOrders
    .filter((workorder) => workorder.closed.length > 0) // closed
    .map((workOrder) => { return new IdValue(workOrder.number.toString(), workOrder.title) })
  setListIdValues('workorders-list-opened-id', openedWorkOrders)
  setListIdValues('workorders-list-closed-id', closedWorkOrders)
}

export function bindUserToForm(user: User): void {
  model.setUser(user)
  setValueById('user-role-id', user.role)
  setValueById('user-name-id', user.name)
  setValueById('user-email-address-id', user.emailAddress)
  setValueById('user-street-address-id', user.streetAddress)
  setValueById('user-registered-id', user.registered)
}

export function bindServiceProvidersToSelect(serviceProviders: User[]): void {
  model.setServiceProviders(serviceProviders)
  const idvalues: IdValue[] = []
  for (const serviceProvider of serviceProviders) {
    idvalues.push({ id: serviceProvider.id.toString(), value: serviceProvider.name })
  }
  setSelectIdValues('workorder-service-provider-id', idvalues)
}

export function bindWorkOrdersToList(workOrders: WorkOrder[]): void {
  model.setWorkOrders(workOrders)
  splitWorkOrders(workOrders)
}

export function bindEmptyWorkOrderToForm() {
  setValueById('workorder-number-id', '0')
  setValueById('workorder-title-id', "title")
  setValueById('workorder-issue-id', "issue")
  setImageUrlHrefById('workorder-image-url-anchor-id', "#0")
  setValueById('workorder-image-url-id', "")
  setValueById('workorder-resolution-id', "")
  setValueById('workorder-opened-id', new Date().toISOString())
  setValueById('workorder-closed-id', "")
  setCheckBoxById('workorder-closed-check-id', false)
}

export function bindWorkOrderToForm(workOrder: WorkOrder) {
  setValueById('workorder-number-id', workOrder.number.toString())
  setSelectOptionById('workorder-service-provider-id', workOrder.serviceProviderId.toString())
  setValueById('workorder-title-id', workOrder.title)
  setValueById('workorder-issue-id', workOrder.issue)
  setImageUrlHrefById('workorder-image-url-anchor-id', workOrder.imageUrl)
  setImageUrlById('workorder-image-url-id', workOrder.imageUrl)
  setValueById('workorder-resolution-id', workOrder.resolution)
  setValueById('workorder-opened-id', workOrder.opened)
  setValueById('workorder-closed-id', workOrder.closed)
  setCheckBoxById('workorder-closed-check-id', workOrder.closed.length === 0 ? false : true)
}