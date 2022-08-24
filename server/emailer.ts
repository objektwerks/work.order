// @ts-check
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

const config = {
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT ?? 587),
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  }
}
const transporter: Mail = nodemailer.createTransport();

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