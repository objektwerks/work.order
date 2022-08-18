// @ts-check
import { setListIdValues, setSelectIdValues, setSelectOptionById, setImageUrlById, setValueById } from './common.js';

// @ts-ignore
import { WorkOrder } from './entity.js';

export default () => {
  console.log('*** model init ...');
}

let user = {};
let serviceProviders = [];
let workOrders = new Map();

function splitWorkOrders(workorders, openedListId, closedListId) {
  const openedWorkOrders = workorders.values().filter((workorder) => { workorder.closed.length === 0});
  const closedWorkOrders = workorders.values().filter((workorder) => { workorder.closed.length > 0});
  let openedList = [];
  for (const workorder of openedWorkOrders) {
    openedList.push({ id: workorder.number, value: workorder.title });
  }
  let closedList = [];
  for (const workorder of closedWorkOrders) {
    closedList.push({ id: workorder.number, value: workorder.title });
  }
  setListIdValues(openedListId, openedList);
  setListIdValues(closedListId, closedList);
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
  splitWorkOrders(workOrders, 'workorders-list-opened-id', 'workorders-list-closed-id')
}

export function bindUserToView(user) {
  user = user;
  setValueById('workorder-homeowner-id', user.name);
  setValueById('user-role-id', user.role);
  setValueById('user-name-id', user.name);
  setValueById('user-email-address-id', user.emailAddress);
  setValueById('user-street-address-id', user.streetAddress);
  setValueById('user-registered-id', user.registered);
}

export function bindServiceProvidersToSelectView(serviceProviders) {
  const idvalues = [];
  for (const serviceProvider of serviceProviders) {
    idvalues.push({ id: serviceProvider.id, value: serviceProvider.name });
  }
  setSelectIdValues('workorder-service-provider-id', idvalues);
}

export function bindWorkOrdersToListView(workOrders) {
  workOrders.clear();
  for (const workOrder of workOrders) {
    workOrders.set(workOrder.number, workOrder);
  }
  splitWorkOrders(workOrders, 'workorders-list-opened-id', 'workorders-list-closed-id')
}

export function bindEmptyWorkOrderToView() {
  setValueById('workorder-number-id', 0);
  setValueById('workorder-title-id', "");
  setValueById('workorder-issue-id', "");
  setValueById('workorder-image-url-id', "");
  setValueById('workorder-resolution-id', "");
  setValueById('workorder-opened-id', new Date().toISOString());
  setValueById('workorder-closed-id', "");
}

export function bindWorkOrderToView(workOrder) {
  setValueById('workorder-number-id', workOrder.number);
  setSelectOptionById('workorder-service-provider-id', workOrder.serviceProviderId);
  setValueById('workorder-title-id', workOrder.title);
  setValueById('workorder-issue-id', workOrder.issue);
  setImageUrlById('workorder-image-url-id', workOrder.imageUrl);
  setValueById('workorder-resolution-id', workOrder.resolution);
  setValueById('workorder-opened-id', workOrder.opened);
  setValueById('workorder-closed-id', workOrder.closed);
}