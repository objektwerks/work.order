// @ts-check

/*
2. post - /register
3. post - /login
4. post - /workorders/add
5. post - /workorders/update
6. get  - /workorders/:userid
7. get  - /workorders/:number
8. post - /users/update
9. get  - /users/:role

1. client:register --- registration --> server --- status ---> client
2. client:login --- credentials --> server --- user, workorders --> client
3. client:add --- work order --> server --- workorder --> client
4. client:update --- work order --> server --- status --> client
5. client:list --- userid --> server --- workorders --> client
6. client:get --- number --> server --- workorder --> client
7. client:update --- user --> server --- status --> client
8. client:list --- role --> server --- users --> client
*/

import { toJson, toObject, Status, User, Users, UserWorkOrders, WorkOrder, WorkOrders } from './model.js';

export class Fetcher {
  constructor() {
    this.get = 'GET';
    this.post = 'POST';
    this.headers = {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json'
    }
  }

  send(url, method, entity, fault) {
    return fetch(url, {
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
    return this.send('/register', this.post, registration, () => Status.fail('Register failed.'));
  }

  login(credentials) {
    return this.send('/login', this.post, credentials, () => UserWorkOrders.fail('Login failed.'));
  }

  addWorkOrder(workorder) {
    return this.send('/workorders/add', this.post, workorder, () => WorkOrder.fail('Add work order failed!'));
  }

  updateWorkOrder(workorder) {
    return this.send('/workorders/update', this.post, workorder, () => WorkOrder.fail('Update work order failed!'));
  }

  listWorkOrdersByUserId(userId) {
    return this.send(`/workorders/${userId}`, this.get, {}, () => WorkOrders.fail('List work orders by user failed!'));
  }

  getWorkOrdersByNumber(number) {
    return this.send(`/workorders/${number}`, this.get, {}, () => WorkOrder.fail('Get work order by number failed!'));
  }

  updateUser(user) {
    return this.send('/users/update', this.post, user, () => Status.fail('Update user failed.'));
  }

  listUsersByRole(role) {
    return this.send(`/users/${role}`, this.get, {}, () => Users.fail('List users by role failed!'));
  }
}