const express = require('express')
const router = express.Router()
const validate = require('./validation')
const usersController = require('../../../controllers/users')
const guard = require('../../../helpers/guard')

router.post('/auth/register', validate.register, usersController.register)
router.post('/auth/login', validate.login, usersController.login)
router.post('/auth/logout', guard, usersController.logout)
router.post('/current', guard, usersController.current)

module.exports = router
