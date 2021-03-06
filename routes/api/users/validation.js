const Joi = require('joi')

const schemaRegister = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    subscription: Joi.string(),
})

const schemaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
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

module.exports.register = (req, _res, next) => {
    return validate(schemaRegister, req.body, next)
}

module.exports.login = (req, _res, next) => {
    return validate(schemaLogin, req.body, next)
}
