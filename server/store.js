import mysql from 'mysql';
import * as Entity from './entity.js';

export default class Store {
  constructor(url) {
    this.url = url;
    this.connection = mysql.createConnection(url);
    console.log("*** connected to store ...");
  }

  disconnect() {
    this.connection.end();
    console.log("*** disconnected from store.");
  }

  listWorkOrdersByUserId(userId) {
    var list = [];
    connection.query(`select * from work_order where homeowner_id = ${userId} or service_provider_id = ${userId}`, (err, rows) => {
      if(err) {
        console.log(err)
      } else {
        rows.forEach((row) => {
          console.log(row);
          list.push(
            WorkOrder.create(row.number, row.homeowner_id, row.service_provider_id, row.issue, row.image_url, row.resolution, row.opened, row.closed)
          )
        });
      }
    });
    list;
  }

  getWorkOrderByNumber(number) {
    var list = [];
    connection.query(`select * from work_order where number = ${number}`, (err, rows) => {
      if(err) {
        console.log(err)
      } else {
        rows.forEach((row) => {
          console.log(row);
          list.push(
            WorkOrder.create(row.number, row.homeowner_id, row.service_provider_id, row.issue, row.image_url, row.resolution, row.opened, row.closed)
          )
        });
      }
    });
    if (list.length > 0) list[0];
  }

  addWorkOrder(workorder) {

  }

  updateWorkOrder(workorder) {

  }

  getUser(emailAddress, pin) {

  }

  listUsersByRole(role) {

  }

  addUser(user) {

  }

  updateUser(user) {

  }
}