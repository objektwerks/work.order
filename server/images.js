// @ts-check
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
    } else if(file.mimetype === 'image/heic') {
      ext = '.heic';
    } else {
      ext = "unknown";
    }
    const filename = file.filename + ext;
    callback(null, filename);
  }
})
const fileFilter = (request, file, callback) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/heic') {
      callback(null, true);
  } else {
      callback(null, false);
  }
}
export const images = multer({ storage: storage, fileFilter: fileFilter });