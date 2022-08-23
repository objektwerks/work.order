// @ts-check
import { setListIdValues, setSelectIdValues, setValueById } from './common.js';

const state = {
  user: {},
  workOrders: new Map()
}

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
  return state.user.id;
}

export function getUserRole() {
  return state.user.role;
}

export function getUser() {
  return state.user;
}

export function setUser(name, emailAddress, streetAddress) {
  state.user.name = name;
  state.user.emailAddress = emailAddress;
  state.user.streetAddress = streetAddress;
}

export function getWorkOrderByNumber(number) {
  return state.workOrders.get(number);
}

export function addWorkOrder(workOrder) {
  state.workOrders.set(workOrder.number, workOrder);
  const sortedWorkOrders = Array.from(state.workOrders.values()).sort((a, b) => Date.parse(b.opened) - Date.parse(a.opened));
  splitWorkOrders(state.workOrders, 'workorders-list-opened-id', 'workorders-list-closed-id');
}

export function bindUserToForm(user) {
  state.user = user;
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
  state.workOrders.clear();
  for (const workOrder of workOrders) {
    state.workOrders.set(workOrder.number, workOrder);
  }
  splitWorkOrders(state.workOrders, 'workorders-list-opened-id', 'workorders-list-closed-id');
}