import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/smtp-transport'
import { SentMessageInfo } from 'nodemailer/lib/sendmail-transport'

const sender = process.env.WORK_ORDER_EMAIL_SENDER as string
const options: Mail.Options = {
  host: process.env.WORK_ORDER_EMAIL_HOST,
  port: parseInt( process.env.WORK_ORDER_EMAIL_PORT ?? '587' ),
  secure: false,
  auth: {
    user: sender,
    pass: process.env.WORK_ORDER_EMAIL_PASSWORD as string,
  },
  logger:true
}
const transporter = nodemailer.createTransport(options)

export default () => {
  console.log('*** emailer connected ...')
}

export async function send(recipient: string, subject: string, text: string): Promise<void> {
  const message = {
    from: sender,
    to: recipient,
    subject: subject,
    text: text
  }
  transporter.sendMail(message, (error: Error | null, info: SentMessageInfo) => {
    if (error) {
      console.log('*** emailer failed with error: %s', error.message)
      throw error.message
    } else {
      console.log('*** emailer sent message id: %s to: %s', info.messageId, message.to)
    }
  })
}