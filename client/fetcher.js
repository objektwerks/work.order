// @ts-check

// @ts-ignore
import { toJson, toObject, Status, UserServiceProvidersWorkOrders, WorkOrder, WorkOrders } from './entity.js';

export default class Fetcher {
  constructor(rootUrl) {
    this.rootUrl = rootUrl
    this.registerUrl = rootUrl + '/register';
    this.loginUrl = rootUrl + '/login';
    this.addWorkOrderUrl = rootUrl + '/workorders/add';
    this.saveWorkOrderUrl = rootUrl + '/workorders/save';
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
    let result;
    try {
      let response = await fetch(url, {
        method: method,
        headers: this.headers,
        body: toJson(entity)
      });
      if (response.ok) {
        result = toObject( await response.json() );
      } else {
        throw `*** ${url} failed with status code: ${response.status} status text: ${response.statusText}`;
      }
    } catch (error) {
      console.log(error);
      result = fault();
    }
    console.log(`*** fetcher:call -> url: ${url} result: `, result);
    return result;
  }

  async register(registration) {
    return await this.call(this.registerUrl, this.post, registration, () => Status.fail('Register failed.'));
  }

  async login(credentials) {
    return await this.call(this.loginUrl, this.post, credentials, () => UserServiceProvidersWorkOrders.fail('Login failed.'));
  }

  async addWorkOrder(workorder) {
    return await this.call(this.addWorkOrderUrl, this.post, workorder, () => WorkOrder.fail('Add work order failed!'));
  }

  async saveWorkOrder(workorder) {
    return await this.call(this.saveWorkOrderUrl, this.post, workorder, () => WorkOrder.fail('Update work order failed!'));
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
}