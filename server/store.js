import mysql from 'mysql';
import { User, WorkOrder } from './entity.js';

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

  log(method, error) {
    console.log(`*** store.${method} error: ${error}`)
  }

  listWorkOrdersByUserId(userId) {
    let list = [];
    connection.query(`select * from work_order where homeowner_id = ${userId} or service_provider_id = ${userId} order by opened desc`, (error, rows) => {
      if (error) {
        log('listWorkOrdersByUserId', error)
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
    let list = [];
    connection.query(`select * from user where role = ${role} order by name asc`, (error, rows) => {
      if (error) {
        log('listUsersByRole', error)
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
    let list = [];
    connection.query(`select * from work_order where number = ${number}`, (error, rows) => {
      if (error) {
        log('getWorkOrderByNumber', error)
      } else {
        rows.forEach((row) => {
          console.log(row);
          list.push(
            WorkOrder.create(row.number, row.homeowner_id, row.service_provider_id, row.issue, row.image_url, row.resolution, row.opened, row.closed)
          )
        });
      }
    });
    return (list.length > 0) ? list[0] : null;
  }

  getUserByEmailAddressPin(emailAddress, pin) {
    let list = [];
    connection.query(`select * from user where email_address = ${emailAddress} and pin = ${pin}`, (error, rows) => {
      if (error) {
        log('getUserByEmailAddressPin', error)
      } else {
        rows.forEach((row) => {
          console.log(row);
          list.push(
            User.create(row.id, row.role, row.name, row.email_address, row.street_address, row.registered)
          )
        });
      }
    });
    return (list.length > 0) ? list[0] : null;
  }

  addWorkOrder(workorder) {
    let number = 0;
    connection.query('insert into work_order set ?', workorder, (error, result) => {
      if (error) {
        log('addWorkOrder', error)
      } else {
        number = result.insertId;
        console.log(`workorder number: ${number}`);
      }
    });
    number;
  }

  addUser(user) {
    let id = 0;
    connection.query('insert into user set ?', user, (error, result) => {
      if (error) {
        log('addUser', error)
      } else {
        id = result.insertId;
        console.log(`user id: ${id}`);
      }
    });
    id;
  }

  updateWorkOrder(workorder) {
    let count = 0;
    connection.query('update work_order SET ? where number = ?', [workorder, workorder.number], (error, result) => {
      if (error) {
        log('updateWorkOrder', error)
      } else {
        count = result.affectedRows;
        console.log(`workorder ${workorder.number} update count: ${count}`);
      }
    });
    count;
  }

  updateUser(user) {
    let count = 0;
    connection.query('update user SET ? where id = ?', [user, user.id], (error, result) => {
      if (error) {
        log('updateUser', error)
      } else {
        count = result.affectedRows;
        console.log(`user ${user.id} update count: ${count}`);
      }
    });
    count;
  }
}