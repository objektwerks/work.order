import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/smtp-transport'
import { SentMessageInfo } from 'nodemailer/lib/sendmail-transport'
import { logger } from './logger.js'

const sender = process.env.WORK_ORDER_EMAIL_SENDER as string
const options: Mail.Options = {
  host: process.env.WORK_ORDER_EMAIL_HOST,
  port: parseInt( process.env.WORK_ORDER_EMAIL_PORT ?? '587' ),
  secure: false,
  requireTLS: true,
  auth: {
    user: sender,
    pass: process.env.WORK_ORDER_EMAIL_PASSWORD as string,
  },
  logger:true
}
const transporter = nodemailer.createTransport(options)

export default () => {
  console.log('*** emailer init ...')
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
      logger.error(`*** emailer failed with error: ${error.message}`)
      throw error.message
    } else {
      logger.info(`*** emailer sent message id: ${info.messageId} to: ${message.to}`)
    }
  })
}