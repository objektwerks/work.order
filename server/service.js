// @ts-check
import { newPin } from './pin.js';
import { ImageUrl, serviceProvider, Status, User, UserServiceProvidersWorkOrders, WorkOrder, WorkOrders } from '../shared/entity.js';

const subjectRegistration = `Work Order Registration`;
const textRegistration = `is your new 7-character pin. Use it to login. Print this email and keep it in a safe place. Then delete this email!`;

export default class Service {
  constructor(store, emailer) {
    this.store = store;
    this.emailer = emailer;
    console.log('*** service is running ...');
  }

  log(method, message) {
    console.log('*** service.${method}: ', message);
  }

  register(registration) {
    let status;
    try {
      const pin = newPin();
      let id = 0;
      const registered = new Date().toISOString();
      const user = User.create(id, registration.role, registration.name. registration.emailAdress, registration.streetAddress, registered, pin);
      this.emailer.send(user.emailAddress, pin, subjectRegistration, textRegistration);
      id = this.store.addUser(user);
      if (id > 0) {
        status = Status.success();
        this.log('register', `succeeded for: ${registration.emailAddress}`);
      } else {
        status = Status.fail(`Register failed for: ${registration.emailAddress}`);
        this.log('register', `failed for: ${registration.emailAddress}`);
      }
    } catch (error) {
      status = Status.fail(`register failed for ${registration.emailAddress}`);
      this.log('register', `failed for ${registration.emailAddress} error: ${error}`);
    }
    return status;
  }

  login(credentials) {
    let userServiceProvidersWorkOrders;
    try {
      const user = this.store.getUserByEmailAddressPin(credentials.emailAdress, credentials.pin);
      if (Object.entries(user).length > 0) {
        const serviceproviders = this.store.listUsersByRole(serviceProvider);
        const workorders = this.store.listWorkOrdersByUserId(user.id);
        userServiceProvidersWorkOrders = UserServiceProvidersWorkOrders.success(user, serviceproviders, workorders);
        this.log('login', `succeeded for: ${credentials.emailAddress}`);
      } else {
        userServiceProvidersWorkOrders = UserServiceProvidersWorkOrders.fail(`Login failed for ${credentials.emailAddress}`);
        this.log('login', `failed for: ${credentials.emailAddress}`);
      }
    } catch(error) {
      userServiceProvidersWorkOrders.error = `Login failed for ${credentials.emailAddress}`;
      this.log('login', `failed for ${credentials.emailAddress} error: ${error}`);
    }
    return userServiceProvidersWorkOrders;
  }

  listWorkOrdersByUserId(id) {
    let workorders;
    try {
      const list = this.store.listWorkOrdersByUserId(id);
      workorders = WorkOrders.success(list);
      this.log('listWorkOrdersByUserId', `succeeded for user id: ${id}`);
    } catch(error) {
      workorders = WorkOrders.fail('List work orders by user id failed.');
      this.log('listWorkOrdersByUserId', `failed for user id: ${id} error: ${error}`);
    }
    return workorders;
  }

  addWorkOrder(workorder) {
    let saved;
    try {
      const id = this.store.addWorkOrder(workorder);
      workorder.id = id
      saved = WorkOrder.success(workorder);
      this.log('addWorkOrder', `succeeded for id: ${id}`);
    } catch(error) {
      saved = WorkOrder.fail('Add work order failed.');
      this.log('addWorkOrder', `failed: ${error}`);
    }
    return saved;
  }

  saveWorkOrder(workorder) {
    let status;
    try {
      const count = this.store.saveWorkOrder(workorder);
      if (count > 0) {
        status = Status.success();
        this.log('saveWorkOrder', `succeeded for id: ${workorder.id}`);
      } else {
        status = Status.fail('Save work order failed.');
        this.log('saveWorkOrder', `failed.`);
      }
    } catch(error) {
      status = Status.fail('Save work order failed.');
      this.log('saveWorkOrder', `failed: ${error}`);
    }
    return status;
  }

  saveUser(user) {
    let status;
    try {
      const count = this.store.saveUser(user);
      if (count > 0) {
        status = Status.success();
        this.log('saveUser', `succeeded for id: ${user.id}`);
      } else {
        status = Status.fail('Save user order failed.');
        this.log('saveUser', `failed.`);
      }
    } catch(error) {
      status = Status.fail('Save user failed.');
      this.log('saveUser', `failed: ${error}`);
    }
    return status;
  }

  saveImageUrl(url, number) {
    let imageUrl;
    try {
      const count = this.store.saveImageUrl(url, number);
      if (count > 0) {
        imageUrl = ImageUrl.success(url, number);
        this.log('saveImageUrl', `succeeded for number: ${number} url: ${url}`);
      } else {
        imageUrl = ImageUrl.fail('Save image url failed.', url, number);
        this.log('saveImageUrl', `failed for number: ${number} url: ${url}`);
      }
    } catch(error) {
      imageUrl = ImageUrl.fail('Save image url failed.', url, number);
      this.log('saveImageUrl', error);
    }
    return imageUrl;
  }
}