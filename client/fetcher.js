// @ts-check
import { toJson, toObject, Status, Users, UserWorkOrders, WorkOrder, WorkOrders } from './model.js';

export default class Fetcher {
  constructor(rootUrl) {
    this.rootUrl = rootUrl
    this.registerUrl = rootUrl + '/register';
    this.loginUrl = rootUrl + '/login';
    this.addWorkOrderUrl = rootUrl + '/workorders/add';
    this.updateWorkOrderUrl = rootUrl + '/workorders/update';
    this.getWorkOrderByNumberUrl = rootUrl + '/workorders/';
    this.listWorkOrdersByUserIdUrl = rootUrl + '/workorders/user/';
    this.updateUserUrl = rootUrl + '/users/update';
    this.listUsersByRoleUrl = rootUrl + '/users/';
    this.get = 'GET';
    this.post = 'POST';
    this.headers = {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json'
    }
  }

  send(url, method, entity, fault) {
    return fetch(this.rootUrl + url, {
      method: method,
      headers: this.headers,
      body: toJson(entity)
    })
    .then((response) => response.json())
    .then((json) => { return toObject(json) } )
    .catch(error => {
      console.log(`${url} failed: `, error);
      return fault();
    });
  }

  register(registration) {
    return this.send(this.registerUrl, this.post, registration, () => Status.fail('Register failed.'));
  }

  login(credentials) {
    return this.send(this.loginUrl, this.post, credentials, () => UserWorkOrders.fail('Login failed.'));
  }

  addWorkOrder(workorder) {
    return this.send(this.addWorkOrderUrl, this.post, workorder, () => WorkOrder.fail('Add work order failed!'));
  }

  updateWorkOrder(workorder) {
    return this.send(this.updateWorkOrderUrl, this.post, workorder, () => WorkOrder.fail('Update work order failed!'));
  }

  getWorkOrderByNumber(number) {
    return this.send(this.getWorkOrderByNumberUrl + number, this.get, {}, () => WorkOrder.fail('Get work order by number failed!'));
  }

  listWorkOrdersByUserId(id) {
    return this.send(this.listWorkOrdersByUserIdUrl + id, this.get, {}, () => WorkOrders.fail('List work orders by user failed!'));
  }

  updateUser(user) {
    return this.send(this.updateUserUrl, this.post, user, () => Status.fail('Update user failed.'));
  }

  listUsersByRole(role) {
    return this.send(this.listUsersByRoleUrl + role, this.get, {}, () => Users.fail('List users by role failed!'));
  }
}