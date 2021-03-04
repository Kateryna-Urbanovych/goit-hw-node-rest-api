const express = require('express')
const router = express.Router()
const validate = require('./validation')
const contactsController = require('../../../controllers/contacts')

router
    .get('/', contactsController.listContacts)
    .post('/', validate.addContact, contactsController.addContact)

router
    .get('/:contactId', contactsController.getContactById)
    .patch(
        '/:contactId',
        validate.updateContact,
        contactsController.updateContact,
    )
    .delete('/:contactId', contactsController.removeContact)

module.exports = router
