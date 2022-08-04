import { newPin } from './pin.js';
import { Status, User, UserWorkOrders, WorkOrder } from './entity.js';

export default class Service {
  constructor(store, emailer) {
    this.store = store;
    this.emailer = emailer;
    console.log("*** service is running ...");
    console.log(`*** new pin verified: ${newPin()}`)
  }

  register(registration) {
    let status;
    try {
      let id = 0;
      let registered = new Date().toISOString();
      let pin = newPin();
      let user = User.create(id, registration.role, registration.name. registration.emailAdress, registration.streetAddress, registered, pin);
      id = this.store.addUser(user);
      if (id > 0) {
        this.emailer.send(user.emailAddress, pin);
        status = Status.success();
        console.log(`*** service.register succeeded for: ${registration.emailAddress}`);
      } else {
        status = Status.error(`Register failed for: ${registration.emailAddress}`);
        console.log(`*** service.register failed for: ${registration.emailAddress}`);
      }
    } catch (error) {
      status = Status.error(`register failed for ${registration.emailAddress}`);
      console.log(`*** service.register for ${registration.emailAddress} failed: ${error}`);
    }
    return status;
  }

  login(credentials) {
    let userWorkOrders;
    try {
      let user = store.getUserByEmailAddressPin(credentials.emailAdress, credentials.pin);
      if (user != null) {
        let workorders = store.listWorkOrdersByUserId(user.id);
        userWorkOrders = UserWorkOrders.create(user, workorders);
        console.log(`*** service.login succeeded for: ${credentials.emailAddress}`);
      } else {
        userWorkOrders.error = "Login failed!";
        console.log(`*** service.login failed for: ${credentials.emailAddress}`);
      }
    } catch(error) {
      userWorkOrders.error = "Login failed!";
      console.log(`*** service.login for ${credentials.emailAddress} failed: ${error}`);
    }
    return userWorkOrders;
  }

  listWorkOrdersByUserId(userId) {

  }

  listUsersByRole(role) {
    
  }

  getWorkOrderByNumber(number) {

  }

  addWorkOrder(workorder) {
    let saved;
    try {
      let id = this.store.addWorkOrder(workorder);
      workorder.id = id
      saved = WorkOrder.success(workorder);
      console.log(`*** service.saveWorkOrder succeeded for id: ${id}`);
    } catch(error) {
      saved = WorkOrder.fail('Add work order failed!');
      console.log(`*** service.saveWorkOrder failed: ${error}`);
    }
    saved;
  }

  updateWorkOrder(workorder) {
    let status;
    try {
      let count = this.store.updateWorkOrder(workorder);
      if (count > 0) {
        status = Status.success();
        console.log(`*** service.updateWorkOrder succeeded for id: ${workorder.id}`);
      } else {
        status = Status.fail('Update work order failed!');
        console.log(`*** service.updateWorkOrder failed!`);
      }
    } catch(error) {
      status = Status.fail("Update work order failed!");
      console.log(`*** service.updateWorkOrder failed: ${error}`);
    }
    status;
  }

  updateUser(user) {
    let status;
    try {
      let count = this.store.updateUser(user);
      if (count > 0) {
        status = Status.success();
        console.log(`*** service.updateUser succeeded for id: ${user.id}`);
      } else {
        status = Status.fail('Update user order failed!');
        console.log(`*** service.updateUser failed!`);
      }
    } catch(error) {
      status = Status.fail("Update user order failed!");
      console.log(`*** service.updateUser failed: ${error}`);
    }
    status;
  }
}