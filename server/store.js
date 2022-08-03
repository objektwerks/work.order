import mysql from 'mysql';

export default class Store {
  constructor(url) {
    this.url = url;
    this.connection = mysql.createConnection(url);
    console.log("*** connected to store ...")
  }

  disconnect() {
    this.connection.end();
    console.log("*** disconnected from store.")
  }

  listWorkOrdersByUserId(userId) {
    connection.query(`select * from work_order where homeowner_id = ${userId} or service_provider_id = ${userId}`, (err, rows) => {
      if(err) {
        console.log(err)
      } else {
        console.log(rows);
      }
    });
  }

  getWorkOrderByNumber(number) {

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