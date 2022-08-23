// @ts-check
import { setListIdValues, setSelectIdValues, setValueById } from './common.js';

const state = {
  user: {},
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
  return state.workOrders.find(workOrder => workOrder.number === number);
}

export function addWorkOrder(workOrder) {
  state.workOrders.push(workOrder);
  const sortedWorkOrders = state.workOrders.sort((a, b) => Date.parse(b.opened) - Date.parse(a.opened));
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
  state.workOrders = workOrders;
  splitWorkOrders(state.workOrders, 'workorders-list-opened-id', 'workorders-list-closed-id');
}