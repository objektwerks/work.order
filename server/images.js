// @ts-check
import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'images')
  },
  filename: function (request, file, callback) {
    let ext;
    if (file.mimetype === 'image/jpeg') {
      ext = '.jpeg';
    } else if (file.mimetype === 'image/png') {
      ext = '.png';
    } else {
      ext = "unknown";
    }
    const filename = file.filename + ext;
    callback(null, filename);
  }
})

const fileFilter = (request, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
  } else {
      callback(null, false);
  }
}

export const images = multer({ storage: storage, fileFilter: fileFilter });

export function checkImagesDir(dir) {
  if (fs.existsSync(dir)){
    console.log(`*** ${dir} already exists.`);
  } else {
    fs.mkdirSync(dir);
    console.log(`*** ${dir} created.`);
  }
}