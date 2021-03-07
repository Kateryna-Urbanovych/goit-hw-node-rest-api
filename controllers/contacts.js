const Contacts = require('../model/contacts')
const { HttpCode } = require('../helpers/constants')

// @ GET /api/contacts
const listContacts = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contacts = await Contacts.listContacts(userId, req.query)
        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { ...contacts },
        })
    } catch (e) {
        next(e)
    }
}

// @ GET /api/contacts/:contactId
const getContactById = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contact = await Contacts.getContactById(
            req.params.contactId,
            userId,
        )

        if (contact) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: contact,
            })
        } else {
            return res.status(HttpCode.NOT_FOUND).json({
                status: 'error',
                code: HttpCode.NOT_FOUND,
                message: 'Not Found',
            })
        }
    } catch (e) {
        next(e)
    }
}

// @ POST /api/contacts
const addContact = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contact = await Contacts.addContact({
            ...req.body,
            owner: userId,
        })
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: contact,
        })
    } catch (e) {
        next(e)
    }
}

// @ PATCH /api/contacts/:contactId
const updateContact = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contact = await Contacts.updateContact(
            req.params.contactId,
            req.body,
            userId,
        )

        if (!req.body) {
            return res.status(HttpCode.BAD_REQUEST).json({
                status: 'error',
                code: HttpCode.BAD_REQUEST,
                message: 'missing fields',
            })
        }

        if (contact) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: contact,
            })
        } else {
            return res.status(HttpCode.NOT_FOUND).json({
                status: 'error',
                code: HttpCode.NOT_FOUND,
                message: 'Not Found',
            })
        }
    } catch (e) {
        next(e)
    }
}

// @ DELETE /api/contacts/:contactId
const removeContact = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contact = await Contacts.removeContact(
            req.params.contactId,
            userId,
        )
        if (contact) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: contact,
                message: 'Contact deleted',
            })
        } else {
            return res.status(HttpCode.NOT_FOUND).json({
                status: 'error',
                code: HttpCode.NOT_FOUND,
                message: 'Not Found',
            })
        }
    } catch (e) {
        next(e)
    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
}
