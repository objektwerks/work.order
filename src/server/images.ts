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

const txt = '.txt';
const oneHour = 60 * (60 * 1000)

function removeTxtFiles() {
  fs.readdir(imagesDir, (error, files) => {
    if (error) {
      logger.error('*** error reading images dir: ', error)
    } else {
      const txtFiles = files.filter(file => path.extname(file) === txt)
      for(const txtFile of txtFiles) fs.unlinkSync(txtFile)
      logger.info('*** removed txt files: ', txtFiles)
    }
  })
}

setInterval(removeTxtFiles, oneHour)

export const images = multer({ storage: storage, fileFilter: fileFilter })
export const imagesDir = './images'

export function checkImagesDir(): void {
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir)
}