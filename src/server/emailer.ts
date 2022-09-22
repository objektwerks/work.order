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
  logger:false,
  debug:false
}
const transporter = nodemailer.createTransport(options)

export default () => {
  console.log('*** emailer init ...')
}

export async function send(recipients: string, subject: string, html: string): Promise<void> {
  transporter.sendMail({
    from: sender,
    to: recipients, // recipients can contain 1 or more comman-delimitted email addresses
    subject: subject,
    html: html
  }, (error: Error | null, info: SentMessageInfo) => {
    if (error) {
      logger.error(`*** emailer failed with error: ${error.message}`)
      throw error
    } else {
      logger.info(`*** emailer to: ${recipients} subject: ${subject} message: ${html}`)
    }
  })
}