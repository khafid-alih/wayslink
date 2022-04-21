const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()

const {
  register,
  login,
  checkAuth
} = require("../controllers/auth")

const { 
  addLink, 
  getMyLink, 
  getLink,
  updateViewerLink,
  deleteLink
} = require('../controllers/link')

const { 
  getUser, getUsers, deleteUser
} = require('../controllers/user')

const {
  auth
} = require("../middlewares/auth")

const {
  uploadBook
} = require("../middlewares/uploadFile")

router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)

router.get('/user', auth, getUser)
router.get('/users', getUsers)
router.delete('/user', auth, deleteUser)

router.get('/link', auth, getMyLink)
router.post('/link/:templateId', auth, uploadBook('mainLinkImage', 'linkImage1',  'linkImage2', 'linkImage3', 'linkImage4', 'linkImage5'), addLink)

router.get('/link/:id/:uniq', getLink)
router.patch('/view-link/:id', updateViewerLink)
router.delete('/link/:id', deleteLink)

module.exports = router