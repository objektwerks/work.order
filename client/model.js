// @ts-check
import { setListIdValues, setSelectIdValues, setSelectOptionById, setImageUrlById, setValueById } from './common.js';

// @ts-ignore
import { WorkOrder } from './entity.js';

export default () => {
  console.log('*** model init ...');
}

let user = {};
let serviceproviders = [];
let workorders = new Map();

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

export function getUser() {
  return user;
}

export function setUser(name, emailAddress, streetAddress) {
  user.name = name;
  user.emailAddress = emailAddress;
  user.streetAddress = streetAddress;
}

export function getWorkOrderByNumber(number) {
  return workorders.get(number);
}

export function addWorkOrder(workorder) {
  workorders.set(workorder.number, workorder);
  const sortedWorkOrders = Array.from(workorders.values()).sort((a, b) => Date.parse(b.opened) - Date.parse(a.opened));
  splitWorkOrders(workorders, 'workorders-list-opened-id', 'workorders-list-closed-id')
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

export function bindServiceProvidersToSelectView(serviceproviders) {
  const idvalues = [];
  for (const serviceprovider of serviceproviders) {
    idvalues.push({ id: serviceprovider.id, value: serviceprovider.name });
  }
  setSelectIdValues('workorder-service-provider-id', idvalues);
}

export function bindWorkOrdersToListView(workorders) {
  workorders.clear();
  for (const workorder of workorders) {
    workorders.set(workorder.number, workorder);
  }
  splitWorkOrders(workorders, 'workorders-list-opened-id', 'workorders-list-closed-id')
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

export function bindWorkOrderToView(workorder) {
  setValueById('workorder-number-id', workorder.number);
  setSelectOptionById('workorder-service-provider-id', workorder.serviceProviderId);
  setValueById('workorder-title-id', workorder.title);
  setValueById('workorder-issue-id', workorder.issue);
  setImageUrlById('workorder-image-url-id', workorder.imageUrl);
  setValueById('workorder-resolution-id', workorder.resolution);
  setValueById('workorder-opened-id', workorder.opened);
  setValueById('workorder-closed-id', workorder.closed);
}