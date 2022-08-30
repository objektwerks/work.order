import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { SentMessageInfo } from 'nodemailer/lib/sendmail-transport'

const sender = process.env.WORK_ORDER_EMAIL_SENDER as string
const options: SMTPTransport.Options = {
  host: process.env.WORK_ORDER_EMAIL_HOST,
  port: parseInt( process.env.WORK_ORDER_EMAIL_PORT ?? '587' ),
  secure: false,
  auth: {
    user: sender,
    pass: process.env.WORK_ORDER_EMAIL_PASSWORD as string,
  },
  logger:true
}
const transporter: Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport(options)

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