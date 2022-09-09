import pino from 'pino'
import fs from 'fs'

const logsDir = './logs'
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)

export const logger = pino( 
  {
    level: process.env.PINO_LOG_LEVEL || 'info'
  },
  pino.destination(`${logsDir}/${new Date().toISOString()}.log`)
)

console.log('*** logger init ...')