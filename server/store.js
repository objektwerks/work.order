// @ts-check
import mysql from 'mysql';
import { User, WorkOrder } from '../shared/entity.js';

export default class Store {
  constructor(url) {
    this.url = url;
    this.connection = mysql.createPool(url);
    console.log('*** connected to store ...');
  }

  disconnect() {
    this.connection.end();
    console.log('*** disconnected from store.');
  }

  log(method, message) {
    console.log('*** store.${method}: ', message);
  }

  listWorkOrdersByUserId(id) {
    let list = [];
    this.connection.query(`select * from work_order where homeowner_id = ${id} or service_provider_id = ${id} order by opened desc`, (error, rows) => {
      if (error) {
        this.log('listWorkOrdersByUserId', error);
      } else {
        rows.forEach((row) => {
          list.push(
            WorkOrder.create(row.number, row.homeowner_id, row.service_provider_id, row.title, row.issue, row.image_url, row.resolution, row.opened, row.closed)
          )
        });
      }
    });
    return list;
  }

  listUsersByRole(role) {
    let list = [];
    this.connection.query(`select * from user where role = ${role} order by name asc`, (error, rows) => {
      if (error) {
        this.log('listUsersByRole', error);
      } else {
        rows.forEach((row) => {
          list.push(
            User.create(row.id, row.role, row.name, row.email_address, row.street_address, row.registered)
          )
        });
      }
    });
    return list;
  }

  getUserByEmailAddressPin(emailAddress, pin) {
    let list = [];
    this.connection.query(`select * from user where email_address = ${emailAddress} and pin = ${pin}`, (error, rows) => {
      if (error) {
        this.log('getUserByEmailAddressPin', error);
      } else {
        rows.forEach((row) => {
          list.push(
            User.create(row.id, row.role, row.name, row.email_address, row.street_address, row.registered)
          )
        });
      }
    });
    return (list.length > 0) ? list[0] : {};
  }

  addWorkOrder(workorder) {
    let number = 0;
    this.connection.query('insert into work_order set ?', workorder, (error, result) => {
      if (error) {
        this.log('addWorkOrder', error);
      } else {
        number = result.insertId;
        this.log('addWorkOrder', `succeeded for number: ${number}`);
      }
    });
    return number;
  }

  addUser(user) {
    let id = 0;
    this.connection.query('insert into user set ?', user, (error, result) => {
      if (error) {
        this.log('addUser', error);
      } else {
        id = result.insertId;
        this.log('addUser', `succeeded for id: ${id}`);
      }
    });
    return id;
  }

  saveWorkOrder(workorder) {
    let count = 0;
    this.connection.query('update work_order SET ? where number = ?', [workorder, workorder.number], (error, result) => {
      if (error) {
        this.log('saveWorkOrder', error);
      } else {
        count = result.affectedRows;
        this.log('saveWorkOrder', `succeeded for number ${workorder.number}`);
      }
    });
    return count;
  }

  saveUser(user) {
    let count = 0;
    this.connection.query('update user SET ? where id = ?', [user, user.id], (error, result) => {
      if (error) {
        this.log('saveUser', error);
      } else {
        count = result.affectedRows;
        this.log('saveUser', `succeeded for id ${user.id}`);
      }
    });
    return count;
  }

  saveImageUrl(url, number) {
    let count = 0;
    this.connection.query(`update work_order SET image_url = ${url} where number = ${number}`, (error, result) => {
      if (error) {
        this.log('saveImageUrl', error);
      } else {
        count = result.affectedRows;
        this.log('saveImageUrl', `succeeded for number: ${number} url: ${url}`);
      }
    });
    return count;
  }
}