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

  async call(url, method, entity, fault) {
    return await fetch(url, {
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

  async register(registration) {
    return await this.call(this.registerUrl, this.post, registration, () => Status.fail('Register failed.'));
  }

  async login(credentials) {
    return await this.call(this.loginUrl, this.post, credentials, () => UserWorkOrders.fail('Login failed.'));
  }

  async addWorkOrder(workorder) {
    return await this.call(this.addWorkOrderUrl, this.post, workorder, () => WorkOrder.fail('Add work order failed!'));
  }

  async updateWorkOrder(workorder) {
    return await this.call(this.updateWorkOrderUrl, this.post, workorder, () => WorkOrder.fail('Update work order failed!'));
  }

  async getWorkOrderByNumber(number) {
    return await this.call(this.getWorkOrderByNumberUrl + number, this.get, {}, () => WorkOrder.fail('Get work order by number failed!'));
  }

  async listWorkOrdersByUserId(id) {
    return await this.call(this.listWorkOrdersByUserIdUrl + id, this.get, {}, () => WorkOrders.fail('List work orders by user failed!'));
  }

  async updateUser(user) {
    return await this.call(this.updateUserUrl, this.post, user, () => Status.fail('Update user failed.'));
  }

  async listUsersByRole(role) {
    return await this.call(this.listUsersByRoleUrl + role, this.get, {}, () => Users.fail('List users by role failed!'));
  }
}