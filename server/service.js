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
    let id = 0;
    let registered = new Date().toISOString();
    let pin = newPin();
    let user = User.create(id, registration.role, registration.name. registration.emailAdress, registration.streetAddress, registered, pin);
    this.store.saveUser(user);
    this.emailer.send(user.emailAddress, pin);
  }

  login(credentials) {
    let user = store.getUserByEmailAddressPin(credentials.emailAdress, credentials.pin);
    let workorders;
    if (user != null) {
      workorders = store.listWorkOrdersByUserId(user.id);
      return UserWorkOrders.create(user, workorders);
    } else {
      return null;
    }
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