const Joi = require('joi')

const schemaAddContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email(),
    phone: Joi.string().min(10).required(),
    subscription: Joi.string(),
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string().min(10),
    subscription: Joi.string(),
})

const validate = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        const [{ message }] = error.details
        return next({
            status: 400,
            message: `Filed: ${message.replace(/"/g, '')}`,
        })
    }
    next()
}

module.exports.addContact = (req, _res, next) => {
    return validate(schemaAddContact, req.body, next)
}

module.exports.updateContact = (req, _res, next) => {
    return validate(schemaUpdateContact, req.body, next)
}
