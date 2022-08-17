// @ts-check

// @ts-ignore
import { toJson, toObject, ImageUrl, Status, UserServiceProvidersWorkOrders, WorkOrder, WorkOrders } from './entity.js';

export default class Fetcher {
  constructor() {
    const rootUrl = 'https://' + window.location.host;
    this.registerUrl = rootUrl + '/register';
    this.loginUrl = rootUrl + '/login';
    this.addWorkOrderUrl = rootUrl + '/workorders/add';
    this.saveWorkOrderUrl = rootUrl + '/workorders/save';
    this.saveUserUrl = rootUrl + '/users/save';
    this.listUsersByRoleUrl = rootUrl + '/users/';
    this.saveImageUrl = rootUrl + '/image/save';
    this.getWorkOrderByNumberUrl = rootUrl + '/workorders/';
    this.listWorkOrdersByUserIdUrl = rootUrl + '/workorders/user/';
    this.get = 'GET';
    this.post = 'POST';
    this.headers = {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json'
    }
  }

  async call(url, method, headers, entity, fault, asJson = true) {
    let result;
    try {
      let response = await fetch(url, {
        method: method,
        headers: headers,
        body: asJson ? toJson(entity) : entity
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
    return await this.call(this.registerUrl, this.post, this.headers, registration, () => Status.fail('Register failed.'));
  }

  async login(credentials) {
    return await this.call(this.loginUrl, this.post, this.headers, credentials, () => UserServiceProvidersWorkOrders.fail('Login failed.'));
  }

  async addWorkOrder(workorder) {
    return await this.call(this.addWorkOrderUrl, this.post, this.headers, workorder, () => WorkOrder.fail('Add work order failed!'));
  }

  async saveWorkOrder(workorder) {
    return await this.call(this.saveWorkOrderUrl, this.post, this.headers, workorder, () => Status.fail('Save work order failed!'));
  }

  async saveUser(user) {
    return await this.call(this.saveUserUrl, this.post, this.headers, user, () => Status.fail('Save user failed.'));
  }

  async saveImage(number, file, filename) {
    const headers = { "Content-Type": "multipart/form-data" }
    const formdata = new FormData();
    formdata.append('number', number);
    formdata.append('image', file, filename);
    return await this.call(this.saveImageUrl, this.post, headers, formdata, () => ImageUrl.fail('Save image failed.'), false);
  }

  async getWorkOrderByNumber(number) {
    return await this.call(this.getWorkOrderByNumberUrl + number, this.get, this.headers, {}, () => WorkOrder.fail('Get work order by number failed!'));
  }

  async listWorkOrdersByUserId(id) {
    return await this.call(this.listWorkOrdersByUserIdUrl + id, this.get, this.headers, {}, () => WorkOrders.fail('List work orders by user failed!'));
  }
}