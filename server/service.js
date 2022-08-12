// @ts-check
import { newPin } from './pin.js';
import { serviceProvider, Status, User, UserServiceProvidersWorkOrders, WorkOrder, WorkOrders } from '../shared/entity.js';

const subjectRegistration = `Work Order Registration`;
const textRegistration = `is your new 7-character pin. Use it to login. Print this email and keep it in a safe place. Then delete this email!`;

export default class Service {
  constructor(store, emailer) {
    this.store = store;
    this.emailer = emailer;
    console.log('*** service is running ...');
    console.log(`*** new pin verified: ${newPin()}`)
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
        console.log(`*** service.register succeeded for: ${registration.emailAddress}`);
      } else {
        status = Status.fail(`Register failed for: ${registration.emailAddress}`);
        console.log(`*** service.register failed for: ${registration.emailAddress}`);
      }
    } catch (error) {
      status = Status.fail(`register failed for ${registration.emailAddress}`);
      console.log(`*** service.register for ${registration.emailAddress} failed: ${error}`);
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
        console.log(`*** service.login succeeded for: ${credentials.emailAddress}`);
      } else {
        userServiceProvidersWorkOrders = UserServiceProvidersWorkOrders.fail(`Login failed for ${credentials.emailAddress}!`);
        console.log(`*** service.login failed for: ${credentials.emailAddress}`);
      }
    } catch(error) {
      userServiceProvidersWorkOrders.error = `Login failed for ${credentials.emailAddress}!`;
      console.log(`*** service.login for ${credentials.emailAddress} failed: ${error}`);
    }
    return userServiceProvidersWorkOrders;
  }

  listWorkOrdersByUserId(id) {
    let workorders;
    try {
      const list = this.store.listWorkOrdersByUserId(id);
      workorders = WorkOrders.success(list);
      console.log(`*** service.listWorkOrdersByUserId succeeded for user id: ${id}`);
    } catch(error) {
      workorders = WorkOrders.fail('List work orders by user id failed!');
      console.log(`*** service.listWorkOrdersByUserId for user id: ${id} failed: ${error}`);
    }
    return workorders;
  }

  getWorkOrderByNumber(number) {
    let workorder;
    try {
      const get = this.store.getWorkOrderByNumber(number);
      if (Object.entries(get).length > 0) {
        workorder = WorkOrder.success(get);
        console.log(`*** service.getWorkOrderByNumber succeeded for number: ${number}`);
      } else {
        workorder = WorkOrder.fail('Get work order by number failed!');
        console.log(`*** service.getWorkOrderByNumber succeeded for number: ${number}`);
      }
    } catch(error) {
      workorder = WorkOrder.fail('Get work order by number failed!');
      console.log(`*** service.getWorkOrderByNumber for number: ${number} failed: ${error}`);
    }
    return workorder;
  }

  addWorkOrder(workorder) {
    let saved;
    try {
      const id = this.store.addWorkOrder(workorder);
      workorder.id = id
      saved = WorkOrder.success(workorder);
      console.log(`*** service.saveWorkOrder succeeded for id: ${id}`);
    } catch(error) {
      saved = WorkOrder.fail('Add work order failed!');
      console.log(`*** service.saveWorkOrder failed: ${error}`);
    }
    return saved;
  }

  saveWorkOrder(workorder) {
    let status;
    try {
      const count = this.store.saveWorkOrder(workorder);
      if (count > 0) {
        status = Status.success();
        console.log(`*** service.saveWorkOrder succeeded for id: ${workorder.id}`);
      } else {
        status = Status.fail('Save work order failed!');
        console.log(`*** service.saveWorkOrder failed!`);
      }
    } catch(error) {
      status = Status.fail('Save work order failed!');
      console.log(`*** service.saveWorkOrder failed: ${error}`);
    }
    return status;
  }

  updateUser(user) {
    let status;
    try {
      const count = this.store.updateUser(user);
      if (count > 0) {
        status = Status.success();
        console.log(`*** service.updateUser succeeded for id: ${user.id}`);
      } else {
        status = Status.fail('Update user order failed!');
        console.log(`*** service.updateUser failed!`);
      }
    } catch(error) {
      status = Status.fail('Update user order failed!');
      console.log(`*** service.updateUser failed: ${error}`);
    }
    return status;
  }
}