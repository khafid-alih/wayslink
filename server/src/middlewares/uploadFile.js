// import package here
const multer = require('multer')

exports.uploadBook = (imageFile, image1, image2, image3, image4, image5) => {
  // code here
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ""))
    }
  })

  const fileFilter = function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!"
        }
        return cb(new Error("Only image files are allowed!"), false)
      }
    cb(null, true)
  }

  const sizeInMB = 1000
  const maxSize = sizeInMB * 1000 * 1000

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize
    }
  }).fields(
    [ 
      { 
        name: imageFile, 
        maxCount: 1 
      },
      { 
        name: image1, 
        maxCount: 1 
      },
      { 
        name: image2, 
        maxCount: 1 
      },
      { 
        name: image3, 
        maxCount: 1 
      },
      { 
        name: image4, 
        maxCount: 1 
      },
      { 
        name: image5, 
        maxCount: 1 
      },
    ]
  )

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError)
      }
      
      if (!req.files && !err) {
        return res.status(400).send({
          message: "Please select file to upload"
        })
      }
      
      if (err) {
        console.log(err);
        if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file size 10 MB"
          })
        }
        return res.status(400).send(err)
      }

      return next()
    })
  }
};