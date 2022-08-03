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

  listUsersByRole(role) {
    var list = [];
    connection.query(`select * from user where role = ${role}`, (err, rows) => {
      if(err) {
        console.log(err)
      } else {
        rows.forEach((row) => {
          console.log(row);
          list.push(
            User.create(row.id, row.role, row.name, row.email_address, row.street_address, row.registered)
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
    if (list.length > 0) {
      return list[0];
    } else {
      return list;
    }
  }

  getUser(emailAddress, pin) {
    var list = [];
    connection.query(`select * from user where email_address = ${emailAddress} and pin = ${pin}`, (err, rows) => {
      if(err) {
        console.log(err)
      } else {
        rows.forEach((row) => {
          console.log(row);
          list.push(
            User.create(row.id, row.role, row.name, row.email_address, row.street_address, row.registered)
          )
        });
      }
    });
    if (list.length > 0) {
      return list[0];
    } else {
      return list;
    }
  }

  addWorkOrder(workorder) {

  }

  addUser(user) {

  }

  updateWorkOrder(workorder) {

  }

  updateUser(user) {

  }
}