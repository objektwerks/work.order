// @ts-check
import fs from 'fs'
import multer, { FileFilterCallback } from 'multer'
import { Request } from "express"

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: (request: Request, file: Express.Multer.File, callback: DestinationCallback) => {
    const number = request.body.number as number
    const dir = `${imagesDir}/${number}` as string
    ifExistsRemoveDir(dir) // only 1 image per work order!
    ifNotExistsMakeDir(dir)
    callback(null, dir)
  },
  filename: (request: Request, file: Express.Multer.File, callback: FileNameCallback) => {
    callback(null, request.body.imagefilename)
  }
})

const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true)
  } else {
      callback(null, false)
  }
}

function ifExistsRemoveDir(dir: string) {
  if (fs.existsSync(dir)){
    fs.rmSync(dir, { recursive: true })
    console.log(`*** ifExistsRemoveDir -> ${dir} removed.`)
    return true
  } else {
    console.log(`*** ifExistsRemoveDir -> ${dir} does not exist.`)
    return false
  }
}

export const images = multer({ storage: storage, fileFilter: fileFilter })
export const imagesDir = './images'

export function ifNotExistsMakeDir(dir: string) {
  if (fs.existsSync(dir)){
    console.log(`*** ifNotExistsMakeDir -> ${dir} exists.`)
    return false
  } else {
    fs.mkdirSync(dir)
    console.log(`*** ifNotExistsMakeDir -> ${dir} created.`)
    return true
  }
}