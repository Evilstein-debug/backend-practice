import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //ideally shouldn't store with original name due to overwrite issue but since the file stays on server for a very brief time
                                //and then gets deleted from the server as we are using cloudinary, thus its ok. 
  }
})

export const upload = multer({ 
    storage,
 })