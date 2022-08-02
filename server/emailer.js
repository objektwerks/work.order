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
    console.log('*** emailer is connected ...')
  }

  send(recipient, pin) {
    var message = {
      from: this.sender,
      to: recipient,
      subject: `Work Order Registration`,
      text: `Your new pin is: ${pin} Use it to login. Record and keep it in a safe place. Then delete this email!`
    };
    var sendSucceeded = true;
    this.transporter.sendMail(message, function(error, info) {
      if (error) {
        console.log(`*** emailer failed: ${error}`);
        sendSucceeded = false;
      } else {
        console.log(`*** emailer sent: ${info.messageId} to: ${message.to}`);
      }
    });
    return sendSucceeded;
  }
}