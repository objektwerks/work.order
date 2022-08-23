// @ts-check
import { setListIdValues, setSelectIdValues, setValueById } from './common.js';

let user = {};
let workOrders = new Map();

function splitWorkOrders(workOrders, openedWorkOrdersListId, closedWorkOrdersListId) {
  const openedWorkOrders = workOrders.values().filter((workOrder) => { workOrder.closed.length === 0});
  const closedWorkOrders = workOrders.values().filter((workorder) => { workorder.closed.length > 0});
  let openedWorkOrdersList = [];
  for (const workOrder of openedWorkOrders) {
    openedWorkOrdersList.push({ id: workOrder.number, value: workOrder.title });
  }
  let closedWorkOrdersList = [];
  for (const workOrder of closedWorkOrders) {
    closedWorkOrdersList.push({ id: workOrder.number, value: workOrder.title });
  }
  setListIdValues(openedWorkOrdersListId, openedWorkOrdersList);
  setListIdValues(closedWorkOrdersListId, closedWorkOrdersList);
}

export default () => {
  console.log('*** model init ...');
}

export function getUserId() {
  return user.id;
}

export function getUserRole() {
  return user.role;
}

export function getUser() {
  return user;
}

export function setUser(name, emailAddress, streetAddress) {
  user.name = name;
  user.emailAddress = emailAddress;
  user.streetAddress = streetAddress;
}

export function getWorkOrderByNumber(number) {
  return workOrders.get(number);
}

export function addWorkOrder(workorder) {
  workOrders.set(workorder.number, workorder);
  const sortedWorkOrders = Array.from(workOrders.values()).sort((a, b) => Date.parse(b.opened) - Date.parse(a.opened));
  splitWorkOrders(workOrders, 'workorders-list-opened-id', 'workorders-list-closed-id');
}

export function bindUserToForm(user) {
  user = user;
  setValueById('workorder-homeowner-id', user.name);
  setValueById('user-role-id', user.role);
  setValueById('user-name-id', user.name);
  setValueById('user-email-address-id', user.emailAddress);
  setValueById('user-street-address-id', user.streetAddress);
  setValueById('user-registered-id', user.registered);
}

export function bindServiceProvidersToSelect(serviceProviders) {
  const idvalues = [];
  for (const serviceProvider of serviceProviders) {
    idvalues.push({ id: serviceProvider.id, value: serviceProvider.name });
  }
  setSelectIdValues('workorder-service-provider-id', idvalues);
}

export function bindWorkOrdersToList(workOrders) {
  workOrders.clear();
  for (const workOrder of workOrders) {
    workOrders.set(workOrder.number, workOrder);
  }
  splitWorkOrders(workOrders, 'workorders-list-opened-id', 'workorders-list-closed-id');
}