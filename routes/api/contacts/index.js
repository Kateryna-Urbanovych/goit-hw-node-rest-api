const express = require('express')
const router = express.Router()
const validate = require('./validation')
const contactsController = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')

router
    .get('/', guard, contactsController.listContacts)
    .post('/', guard, validate.addContact, contactsController.addContact)

router
    .get('/:contactId', guard, contactsController.getContactById)
    .patch(
        '/:contactId',
        guard,
        validate.updateContact,
        contactsController.updateContact,
    )
    .delete('/:contactId', guard, contactsController.removeContact)

module.exports = router
