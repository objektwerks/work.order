// @ts-check
import { newPin } from './pin.js';
import * as store from './store.js';
import * as emailer from './emailer.js';
import { serviceProvider, ImageUrl, Status, User, UserServiceProvidersWorkOrders, WorkOrder, WorkOrders } from '../shared/entity.js';

const subjectRegistration = `Work Order Registration`;
const textRegistration = `is your new 7-character pin. Use it to login. Print this email and keep it in a safe place. Then delete this email!`;

function log(method, message) {
  console.log('*** service.${method}: ', message);
}

export default () => {
  console.log('*** service running ...');
}

export function shutdown() {
  store.disconnect();
}

export function register(registration) {
  let status;
  try {
    const pin = newPin();
    let id = 0;
    const registered = new Date().toISOString();
    const user = User.create(id, registration.role, registration.name. registration.emailAdress, registration.streetAddress, registered, pin);
    emailer.send(user.emailAddress, pin, subjectRegistration, textRegistration);
    id = store.addUser(user);
    if (id > 0) {
      status = Status.success();
      log('register', `succeeded for ${registration.emailAddress}`);
    } else {
      status = Status.fail(`Register failed for ${registration.emailAddress}`);
      log('register', `failed for: ${registration.emailAddress}`);
    }
  } catch (error) {
    status = Status.fail(`register failed for ${registration.emailAddress}`);
    log('register', `failed error: ${error} for ${registration.emailAddress}`);
  }
  return status;
}

export function login(credentials) {
  let userServiceProvidersWorkOrders;
  try {
    const user = store.getUserByEmailAddressPin(credentials.emailAdress, credentials.pin);
    if (Object.entries(user).length > 0) {
      const serviceProviders = store.listUsersByRole(serviceProvider);
      const workOrders = store.listWorkOrdersByUserId(user.id);
      userServiceProvidersWorkOrders = UserServiceProvidersWorkOrders.success(user, serviceProviders, workOrders);
      log('login', `succeeded for ${credentials.emailAddress}`);
    } else {
      userServiceProvidersWorkOrders = UserServiceProvidersWorkOrders.fail(`Login failed for ${credentials.emailAddress}`);
      log('login', `failed for ${credentials.emailAddress}`);
    }
  } catch(error) {
    userServiceProvidersWorkOrders.error = `Login failed for ${credentials.emailAddress}`;
    log('login', `failed error: ${error} for ${credentials.emailAddress}`);
  }
  return userServiceProvidersWorkOrders;
}

export function listWorkOrdersByUserId(id) {
  let workOrders;
  try {
    const list = store.listWorkOrdersByUserId(id);
    workOrders = WorkOrders.success(list);
    log('listWorkOrdersByUserId', `succeeded for user id: ${id}`);
  } catch(error) {
    workOrders = WorkOrders.fail('List work orders by user id failed.');
    log('listWorkOrdersByUserId', `failed error: ${error} for id: ${id}`);
  }
  return workOrders;
}

export function getWorkOrderByNumber(number) {
  let workOrder;
  try {
    const get = store.getWorkOrderByNumber(number);
    if (Object.entries(get).length > 0) {
      workOrder = WorkOrder.success(get);
      log('getWorkOrderByNumber', `succeeded for number: ${number}`);
    } else {
      workOrder = WorkOrder.fail('Get work order by number failed.', number);
      log('getWorkOrderByNumber', `succeeded for number: ${number}`);
    }
  } catch(error) {
    workOrder = WorkOrder.fail('Get work order by number failed.', number);
    log('getWorkOrderByNumber', `failed error: ${error} for number: ${number}`);
  }
  return workOrder;
}

export function addWorkOrder(workOrder) {
  let status;
  try {
    const number = store.addWorkOrder(workOrder);
    workOrder.number = number
    status = WorkOrder.success(workOrder);
    log('addWorkOrder', `succeeded for number: ${number}`);
  } catch(error) {
    status = WorkOrder.fail('Add work order failed.', workOrder.number);
    log('addWorkOrder', `failed: ${error} for ${workOrder}`);
  }
  return status;
}

export function saveWorkOrder(workOrder) {
  let status;
  try {
    const count = store.saveWorkOrder(workOrder);
    if (count > 0) {
      status = WorkOrder.success(workOrder);
      log('saveWorkOrder', `succeeded for number: ${workOrder.number}`);
    } else {
      status = WorkOrder.fail('Save work order failed.', workOrder);
      log('saveWorkOrder', `failed for ${workOrder}`);
    }
  } catch(error) {
    status = Status.fail('Save work order failed.');
    log('saveWorkOrder', `failed: ${error} for ${workOrder}`);
  }
  return status;
}

export function saveUser(user) {
  let status;
  try {
    const count = store.saveUser(user);
    if (count > 0) {
      status = Status.success();
      log('saveUser', `succeeded for id: ${user.id}`);
    } else {
      status = Status.fail('Save user failed.');
      log('saveUser', `failed for ${user}`);
    }
  } catch(error) {
    status = Status.fail('Save user failed.');
    log('saveUser', `failed: ${error} for ${user}`);
  }
  return status;
}

export function saveImageUrl(number, url) {
  let status;
  try {
    const count = store.saveImageUrl(number, url);
    if (count > 0) {
      status = ImageUrl.success(number, url);
      log('saveImageUrl', `succeeded for number: ${number} url: ${url}`);
    } else {
      status = ImageUrl.fail('Save image url failed.', number, url);
      log('saveImageUrl', `failed for number: ${number} url: ${url}`);
    }
  } catch(error) {
    status = ImageUrl.fail('Save image url failed.', number, url);
    log('saveImageUrl', `failed: for number: ${number} url: ${url} error: ${error}`);
  }
  return status;
}