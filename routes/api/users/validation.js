const Joi = require('joi')
const { HttpCode } = require('../../../helpers/constants')

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
            status: HttpCode.BAD_REQUEST,
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

module.exports.validateUploadAvatar = (req, res, next) => {
    if (!req.file) {
        return res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            data: 'Bad request',
            message: 'Not authorized', // или 'Field of avatar with file not found'
        })
    }
    next()
}
