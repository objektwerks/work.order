// @ts-check
import { setListIdValues, setSelectIdValues, setValueById } from './common.js';

const model = {
  user: {},
  serviceProviders: [],
  workOrders: []
}

function splitWorkOrders(workOrders, openedWorkOrdersListId, closedWorkOrdersListId) {
  const openedWorkOrders = workOrders
    .filter((workOrder) => workOrder.closed.length === 0) // opened
    .map((workOrder) => { return { id: workOrder.number, value: workOrder.title } });
  const closedWorkOrders = workOrders
    .filter((workorder) => workorder.closed.length > 0) // closed
    .closedWorkOrders.map((workOrder) => { return { id: workOrder.number, value: workOrder.title } });
  setListIdValues(openedWorkOrdersListId, openedWorkOrders);
  setListIdValues(closedWorkOrdersListId, closedWorkOrders);
}

export default () => {
  console.log('*** model init ...');
}

export function getUserId() {
  return model.user.id;
}

export function getUserRole() {
  return model.user.role;
}

export function getUser() {
  return model.user;
}

export function setUser(name, emailAddress, streetAddress) {
  model.user.name = name;
  model.user.emailAddress = emailAddress;
  model.user.streetAddress = streetAddress;
}

export function getWorkOrderByNumber(number) {
  return model.workOrders.find(workOrder => workOrder.number === number);
}

export function addWorkOrder(workOrder) {
  model.workOrders.push(workOrder);
  const sortedWorkOrders = model.workOrders.sort((a, b) => Date.parse(b.opened) - Date.parse(a.opened));
  splitWorkOrders(model.workOrders, 'workorders-list-opened-id', 'workorders-list-closed-id');
}

export function bindUserToForm(user) {
  model.user = user;
  setValueById('user-role-id', user.role);
  setValueById('user-name-id', user.name);
  setValueById('user-email-address-id', user.emailAddress);
  setValueById('user-street-address-id', user.streetAddress);
  setValueById('user-registered-id', user.registered);
}

export function bindServiceProvidersToSelect(serviceProviders) {
  model.serviceProviders = serviceProviders;
  const idvalues = [];
  for (const serviceProvider of serviceProviders) {
    idvalues.push({ id: serviceProvider.id, value: serviceProvider.name });
  }
  setSelectIdValues('workorder-service-provider-id', idvalues);
}

export function bindWorkOrdersToList(workOrders) {
  model.workOrders = workOrders;
  splitWorkOrders(model.workOrders, 'workorders-list-opened-id', 'workorders-list-closed-id');
}