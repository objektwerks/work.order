import nodemailer from 'nodemailer';

export default class Emailer {
  constructor(host, port, sender, password) {
    this.host = host;
    this.port = port;
    this.sender = sender;
    this.password = password;
    this.transporter = nodemailer.createTransport({
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

  send(recipient, subject, pin) {
    var message = {
      from: this.sender,
      to: recipient,
      subject: subject,
      text: `Your pin is: ${pin}`
    };
    this.transporter.sendMail(message, function(error, info) {
      if (error) {
        console.log(`*** Emailer failed: ${error}`);
      } else {
        console.log(`*** Emailer sent: ${info.messageId} to: ${message.to}`);
      }
    });
  }
}