import fs from 'fs'
import pino from 'pino'
import pretty from 'pino-pretty'

const logsDir = process.env.WORK_ORDER_LOGS_DIR ?? './logs'
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)

const stream = pretty({
  destination: `${logsDir}/${new Date().toISOString()}.log`
})

export const logger = pino( { level: process.env.PINO_LOG_LEVEL || 'info' }, stream )