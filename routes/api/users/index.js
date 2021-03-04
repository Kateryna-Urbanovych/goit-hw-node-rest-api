const express = require('express')
const router = express.Router()
// const validate = require('./validation')
const usersController = require('../../../controllers/users')

router.post('/auth/register', usersController.register)
router.post('/auth/login', usersController.login)
router.post('/auth/logout', usersController.logout)

module.exports = router
