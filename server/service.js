// @ts-check
import { newPin } from './pin.js';
import * as store from './store.js';
import * as emailer from './emailer.js';

import { ImageUrl, serviceProvider, Status, User, UserServiceProvidersWorkOrders, WorkOrder, WorkOrders } from '../shared/entity.js';

const subjectRegistration = `Work Order Registration`;
const textRegistration = `is your new 7-character pin. Use it to login. Print this email and keep it in a safe place. Then delete this email!`;

export default () => {
  console.log('*** service running ...');
}

function log(method, message) {
  console.log('*** service.${method}: ', message);
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
      log('register', `succeeded for: ${registration.emailAddress}`);
    } else {
      status = Status.fail(`Register failed for: ${registration.emailAddress}`);
      log('register', `failed for: ${registration.emailAddress}`);
    }
  } catch (error) {
    status = Status.fail(`register failed for ${registration.emailAddress}`);
    log('register', `failed for ${registration.emailAddress} error: ${error}`);
  }
  return status;
}

export function login(credentials) {
  let userServiceProvidersWorkOrders;
  try {
    const user = store.getUserByEmailAddressPin(credentials.emailAdress, credentials.pin);
    if (Object.entries(user).length > 0) {
      const serviceproviders = store.listUsersByRole(serviceProvider);
      const workorders = store.listWorkOrdersByUserId(user.id);
      userServiceProvidersWorkOrders = UserServiceProvidersWorkOrders.success(user, serviceproviders, workorders);
      log('login', `succeeded for: ${credentials.emailAddress}`);
    } else {
      userServiceProvidersWorkOrders = UserServiceProvidersWorkOrders.fail(`Login failed for ${credentials.emailAddress}`);
      log('login', `failed for: ${credentials.emailAddress}`);
    }
  } catch(error) {
    userServiceProvidersWorkOrders.error = `Login failed for ${credentials.emailAddress}`;
    log('login', `failed for ${credentials.emailAddress} error: ${error}`);
  }
  return userServiceProvidersWorkOrders;
}

export function listWorkOrdersByUserId(id) {
  let workorders;
  try {
    const list = store.listWorkOrdersByUserId(id);
    workorders = WorkOrders.success(list);
    log('listWorkOrdersByUserId', `succeeded for user id: ${id}`);
  } catch(error) {
    workorders = WorkOrders.fail('List work orders by user id failed.');
    log('listWorkOrdersByUserId', `failed for user id: ${id} error: ${error}`);
  }
  return workorders;
}

export function getWorkOrderByNumber(number) {
  let workorder;
  try {
    const get = store.getWorkOrderByNumber(number);
    if (Object.entries(get).length > 0) {
      workorder = WorkOrder.success(get);
      log('getWorkOrderByNumber', `succeeded for number: ${number}`);
    } else {
      workorder = WorkOrder.fail('Get work order by number failed.', number);
      log('getWorkOrderByNumber', `succeeded for number: ${number}`);
    }
  } catch(error) {
    workorder = WorkOrder.fail('Get work order by number failed.', number);
    log('getWorkOrderByNumber', `failed for number: ${number} error: ${error}`);
  }
  return workorder;
}

export function addWorkOrder(workorder) {
  let saved;
  try {
    const id = store.addWorkOrder(workorder);
    workorder.id = id
    saved = WorkOrder.success(workorder);
    log('addWorkOrder', `succeeded for id: ${id}`);
  } catch(error) {
    saved = WorkOrder.fail('Add work order failed.', workorder.number);
    log('addWorkOrder', `failed: ${error}`);
  }
  return saved;
}

export function saveWorkOrder(workorder) {
  let status;
  try {
    const count = store.saveWorkOrder(workorder);
    if (count > 0) {
      status = Status.success();
      log('saveWorkOrder', `succeeded for id: ${workorder.id}`);
    } else {
      status = Status.fail('Save work order failed.');
      log('saveWorkOrder', `failed.`);
    }
  } catch(error) {
    status = Status.fail('Save work order failed.');
    log('saveWorkOrder', `failed: ${error} for ${workorder}`);
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
      status = Status.fail('Save user order failed.');
      log('saveUser', `failed.`);
    }
  } catch(error) {
    status = Status.fail('Save user failed.');
    log('saveUser', `failed: ${error} for ${user}`);
  }
  return status;
}

export function saveImageUrl(url, number) {
  let imageUrl;
  try {
    const count = store.saveImageUrl(url, number);
    if (count > 0) {
      imageUrl = ImageUrl.success(url, number);
      log('saveImageUrl', `succeeded for number: ${number} url: ${url}`);
    } else {
      imageUrl = ImageUrl.fail('Save image url failed.', url, number);
      log('saveImageUrl', `failed for number: ${number} url: ${url}`);
    }
  } catch(error) {
    imageUrl = ImageUrl.fail('Save image url failed.', url, number);
    log('saveImageUrl', error);
  }
  return imageUrl;
}