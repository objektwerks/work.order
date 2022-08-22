// @ts-check
import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    const number = request.body.number;
    const dir = `${imagesDir}/${number}`;
    ifExistsRemoveDir(dir);
    ifNotExistsMakeDir(dir);
    callback(null, dir);
  },
  filename: function (request, file, callback) {
    callback(null, request.body.imagefilename);
  }
})

const fileFilter = (request, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
  } else {
      callback(null, false);
  }
}

function ifExistsRemoveDir(dir) {
  if (fs.existsSync(dir)){
    fs.rmSync(dir, { recursive: true });
    console.log(`*** ifExistsRemoveDir -> ${dir} removed.`);
    return true;
  } else {
    console.log(`*** ifExistsRemoveDir -> ${dir} does not exist.`);
    return false;
  }
}

export const images = multer({ storage: storage, fileFilter: fileFilter });
export const imagesDir = './images';

export function ifNotExistsMakeDir(dir) {
  if (fs.existsSync(dir)){
    console.log(`*** ifNotExistsMakeDir -> ${dir} exists.`);
    return false;
  } else {
    fs.mkdirSync(dir);
    console.log(`*** ifNotExistsMakeDir -> ${dir} created.`);
    return true;
  }
}