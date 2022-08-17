// @ts-check

// @ts-ignore
import { toJson, toObject, ImageUrl, Status, UserServiceProvidersWorkOrders, WorkOrder, WorkOrders } from './entity.js';

const rootUrl = 'https://' + window.location.host;
const registerUrl = rootUrl + '/register';
const loginUrl = rootUrl + '/login';
const addWorkOrderUrl = rootUrl + '/workorders/add';
const saveWorkOrderUrl = rootUrl + '/workorders/save';
const saveUserUrl = rootUrl + '/users/save';
const listUsersByRoleUrl = rootUrl + '/users/';
const saveImageUrl = rootUrl + '/image/save';
const getWorkOrderByNumberUrl = rootUrl + '/workorders/';
const listWorkOrdersByUserIdUrl = rootUrl + '/workorders/user/';
const get = 'GET';
const post = 'POST';
const headers = {
  "Content-Type": "application/json; charset=utf-8",
  'Accept': 'application/json'
}

export default () => {
  console.log('*** fetcher init ...');
}

async function call(url, method, headers, entity, fault, asJson = true) {
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

export function register(registration) {
  return this.call(this.registerUrl, this.post, this.headers, registration, () => Status.fail('Register failed.'));
}

export function login(credentials) {
  return this.call(this.loginUrl, this.post, this.headers, credentials, () => UserServiceProvidersWorkOrders.fail('Login failed.'));
}

export function addWorkOrder(workorder) {
  return this.call(this.addWorkOrderUrl, this.post, this.headers, workorder, () => WorkOrder.fail('Add work order failed!'));
}

export function saveWorkOrder(workorder) {
  return this.call(this.saveWorkOrderUrl, this.post, this.headers, workorder, () => Status.fail('Save work order failed!'));
}

export function saveUser(user) {
  return this.call(this.saveUserUrl, this.post, this.headers, user, () => Status.fail('Save user failed.'));
}

export function saveImage(number, file, filename) {
  const headers = { "Content-Type": "multipart/form-data" }
  const formdata = new FormData();
  formdata.append('number', number);
  formdata.append('image', file, filename);
  return this.call(this.saveImageUrl, this.post, headers, formdata, () => ImageUrl.fail('Save image failed.'), false);
}

export function getWorkOrderByNumber(number) {
  return this.call(this.getWorkOrderByNumberUrl + number, this.get, this.headers, {}, () => WorkOrder.fail('Get work order by number failed!'));
}

export function listWorkOrdersByUserId(id) {
  return this.call(this.listWorkOrdersByUserIdUrl + id, this.get, this.headers, {}, () => WorkOrders.fail('List work orders by user failed!'));
}