const rateLimit = require('express-rate-limit')
const { HttpCode } = require('./constants')

const createAccountLimiter = rateLimit({
    // windowMs и max можно вынести в константы в config
    windowMs: 60 * 60 * 1000, // Количество миллисекунд за один час
    max: 2,
    handler: (req, res, next) => {
        return res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            data: 'Bad request',
            message:
                'Too many registrations. No more than two per hour from one IP',
            // Слишком много регистраций. Не больше двух за час с одного IP
        })
    },
})

module.exports = { createAccountLimiter }
