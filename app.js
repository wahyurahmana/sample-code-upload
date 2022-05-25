const express = require('express')
const multer = require('multer')
const app = express()
const port = 3000

app.use(express.static('upload'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload')
  },
  filename: (req, file, cb) => {
    const nameFile = Math.ceil(Math.random() * 999) + file.originalname
    cb(null, nameFile)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      cb(new Error('Terjadi Kesalahan'))
    }
  },
  limits : {
    fileSize : 300000
  }
})

app.post('/upload-single',upload.single('fieldUpload'), (req, res) => {
  res.status(200).json({
    message: 'berhasil upload file'
  })
})

app.post('/upload-multi',upload.array('fieldMultiUpload', 5), (req, res) => {
  res.status(200).json({
    message: 'berhasil upload file'
  })
})

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})