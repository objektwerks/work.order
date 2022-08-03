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
    connection.query(`select * from work_order where homeowner_id = ${userId} or service_provider_id = ${userId}`, (error, rows) => {
      if (error) {
        console.log(error)
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
    connection.query(`select * from user where role = ${role}`, (error, rows) => {
      if (error) {
        console.log(error)
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
    connection.query(`select * from work_order where number = ${number}`, (error, rows) => {
      if (error) {
        console.log(error)
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

  getUserByEmailAddressPin(emailAddress, pin) {
    var list = [];
    connection.query(`select * from user where email_address = ${emailAddress} and pin = ${pin}`, (error, rows) => {
      if (error) {
        console.log(error)
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

  getUserById(id) {
    var list = [];
    connection.query(`select * from user where id = ${id}`, (error, rows) => {
      if (error) {
        console.log(error)
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
    var number = 0;
    connection.query('insert into work_order set ?', workorder, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        number = result.insertId;
        console.log(`workorder number: ${number}`);
      }
    });
    number;
  }

  addUser(user) {
    var id = 0;
    connection.query('insert into user set ?', user, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        id = result.insertId;
        console.log(`user id: ${id}`);
      }
    });
    id;
  }

  updateWorkOrder(workorder) {
    var count = 0;
    connection.query('update work_order SET ? where number = ?', [workorder, workorder.number], (error, result) => {
      if (error) {
        console.log(error)
      } else {
        count = result.affectedRows;
        console.log(`workorder ${workorder.number} update count: ${count}`);
      }
    });
    count;
  }

  updateUser(user) {
    var count = 0;
    connection.query('update user SET ? where id = ?', [user, user.id], (error, result) => {
      if (error) {
        console.log(error)
      } else {
        count = result.affectedRows;
        console.log(`user ${user.id} update count: ${count}`);
      }
    });
    count;
  }
}