// @ts-check
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

const sender: string = process.env.EMAIL_SENDER as string
const config: object = {
  host: process.env.EMAIL_HOST as string,
  port: process.env.EMAIL_PORT ?? 587 as number,
  secure: true,
  requireTLS: true,
  auth: {
    user: sender,
    pass: process.env.EMAIL_PASSWORD as string,
  },
  logger:true
}
const transporter: Mail = nodemailer.createTransport(config);

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