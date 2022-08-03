import { newPin } from './pin.js';
import { User, UserWorkOrders } from './entity.js';

export default class Service {
  constructor(store, emailer) {
    this.store = store;
    this.emailer = emailer;
    console.log("*** service is running ...");
    console.log(`*** new pin verified: ${newPin()}`)
  }

  register(registration) {
    try {
      let id = 0;
      let registered = new Date().toISOString();
      let pin = newPin();
      let user = User.create(id, registration.role, registration.name. registration.emailAdress, registration.streetAddress, registered, pin);
      this.store.addUser(user);
      let succeeded = this.emailer.send(user.emailAddress, pin);
      console.log(`*** service.register count/succeeded: ${count}/${succeeded} for registration: ${registration}`);
    } catch (error) {
      console.log(`*** service.register for ${registration.emailAddress} failed: ${error}`);
    }
  }

  login(credentials) {
    let userWorkOrders;
    try {
      let user = store.getUserByEmailAddressPin(credentials.emailAdress, credentials.pin);
      if (user != null) {
        let workorders = store.listWorkOrdersByUserId(user.id);
        userWorkOrders = UserWorkOrders.create(user, workorders);
        console.log(`*** service.login succeeded: ${credentials.emailAddress}`);
      } else {
        userWorkOrders.error = "Login failed!";
        console.log(`*** service.login failed: ${credentials.emailAddress}`);
      }
      return userWorkOrders;
    } catch(error) {
      userWorkOrders.error = "Login failed!";
      console.log(`*** service.login for ${credentials.emailAddress} failed: ${error}`);
    }
    return userWorkOrders;
  }

  saveWorkOrder(workorder) {

  }

  listWorkOrdersByUserId(userId) {

  }

  getWorkOrderByNumber(number) {

  }

  saveUser(user) {

  }

  listUsersByRole(role) {
    
  }
}