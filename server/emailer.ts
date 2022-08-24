// @ts-check
import nodemailer from 'nodemailer';

const host = process.env.EMAIL_HOST;
const port = process.env.EMAIL_PORT;
const sender = process.env.EMAIL_SENDER;
const password = process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: true,
  auth: {
    user: sender,
    pass: password,
  },
});

export default () => {
  console.log('*** emailer connected ...');
}

export function send(recipient: string, pin: string, subject: string, text: string) {
  const message = {
    from: sender,
    to: recipient,
    subject: subject,
    text: `${pin} ${text}`
  };
  // @ts-ignore
  transporter.sendMail(message, (error: Error, info: SentMessageInfo) => {
    if (error) {
      console.log(`*** emailer failed: ${error}`);
      throw error;
    } else {
      console.log(`*** emailer sent: ${info.messageId} to: ${message.to}`);
    }
  });
}