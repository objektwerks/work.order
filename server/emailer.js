import nodemailer from 'nodemailer';

export default class Emailer {
  constructor(host, port, sender, password) {
    nodemailer.createTransport({
      host: host,
      port: port,
      secure: true,
      auth: {
        user: sender,
        pass: password,
      },
    });
    console.log("*** emailer is running ...")
  }
}