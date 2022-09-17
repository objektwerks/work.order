import multer, { FileFilterCallback } from 'multer'
import { Request } from "express"
import { isMimeTypeAccepted } from './entity.js'

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
  if (isMimeTypeAccepted(file.mimetype)) {
    // This filter is key to preventing the storage of temporary fake *.txt files
    // from being written to imagesDir. See client/fetcher for more details.
    callback(null, true)
  } else {
    callback(null, false)
  }
}

export const imagesDir = process.env.WORK_ORDER_IMAGES_DIR ?? process.env.HOME + '/.workorder/images'

export default () => {
  console.log('*** images init ...')
}

export const imagesStore = multer({ storage: storage, fileFilter: fileFilter })