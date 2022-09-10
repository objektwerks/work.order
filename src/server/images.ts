import fs from 'fs'
import path from 'path'
import multer, { FileFilterCallback } from 'multer'
import { Request } from "express"
import { logger } from './logger.js'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: (request: Request, file: Express.Multer.File, callback: DestinationCallback) => {
    callback(null, imagesDir)
  },
  filename: (request: Request, file: Express.Multer.File, callback: FileNameCallback) => {
    callback(null, request.body.imageFileName)
  }
})

const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const txt = '.txt'
const oneMinute = (60 * 1000)
const oneHour = 60 * oneMinute
const threeHours = 3 * oneHour
const imagesDir = './images'

function removeTxtFiles() {
  fs.readdir(imagesDir, (error, files) => {
    if (error) {
      logger.error(`*** error reading images dir (${imagesDir}): `, error)
    } else {
      const txtFiles = files.filter(file => path.extname(file) === txt)
      for(const txtFile of txtFiles) fs.unlinkSync(txtFile)
      logger.info('*** removed images txt files: ', txtFiles)
    }
  })
}

setInterval(removeTxtFiles, threeHours)

export default () => {
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir)
  console.log('*** images init ...')
}

export const imagesStore = multer({ storage: storage, fileFilter: fileFilter })