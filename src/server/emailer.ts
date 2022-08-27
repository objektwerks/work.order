import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer"
import { SentMessageInfo } from 'nodemailer/lib/sendmail-transport'

const sender = process.env.WORK_ORDER_EMAIL_SENDER as string
const config: object = {
  host: process.env.WORK_ORDER_EMAIL_HOST as string,
  port: process.env.WORK_ORDER_EMAIL_PORT ?? 587 as number,
  secure: true,
  requireTLS: true,
  auth: {
    user: sender,
    pass: process.env.WORK_ORDER_EMAIL_PASSWORD as string,
  },
  logger:true
}
const transporter: Mail = nodemailer.createTransport(config)

export default () => {
  console.log('*** emailer connected ...')
}

export function send(recipient: string, pin: string, subject: string, text: string): void {
  const message = {
    from: sender,
    to: recipient,
    subject: subject,
    text: `${pin} ${text}`
  }
  transporter.sendMail(message, (error: Error | null, info: SentMessageInfo) => {
    if (error) {
      console.log(`*** emailer failed: ${error}`)
      throw error
    } else {
      console.log(`*** emailer sent: ${info.messageId} to: ${message.to}`)
    }
  })
}