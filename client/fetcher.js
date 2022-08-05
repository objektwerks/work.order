// @ts-check

/*
2. post - /register
3. post - /login
4. post - /workorders/add/:number
5. post - /workorders/update/:number
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

import { toJson, toObject } from './model.js';

export class Fetcher {
  constructor() {
    this.get = 'GET';
    this.post = 'POST';
    this.appJsonHeader = { 'Content-Type': 'application/json;charset=utf-8' };
  }

  register(registration) {
    fetch('/register', {
      method: this.post,
      headers: this.appJsonHeader,
      body: toJson(registration)
    }).then((response) => {
      return toObject(response.json());
    });
  }
}