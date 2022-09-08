import fs from 'fs'
import path from 'path'
import multer, { FileFilterCallback } from 'multer'
import { Request } from "express"

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
    const txtFiles = files.filter(file => path.extname(file) === txt)
    for(const txtFile of txtFiles) {
      removeFile(txtFile)
    }
  })
}

function removeFile(file: string) {
  if (fs.existsSync(file)) fs.unlinkSync(file)
}

setInterval(removeTxtFiles, oneHour)

export const images = multer({ storage: storage, fileFilter: fileFilter })
export const imagesDir = './images'

export function ifNotExistsMakeDir(dir: string): boolean {
  if (fs.existsSync(dir)){
    console.log(`*** images.ifNotExistsMakeDir -> ${dir} exists.`)
    return false
  } else {
    fs.mkdirSync(dir)
    console.log(`*** images.ifNotExistsMakeDir -> ${dir} created.`)
    return true
  }
}