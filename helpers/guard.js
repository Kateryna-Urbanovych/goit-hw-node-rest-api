const passport = require('passport')
require('../config/passport')
const { HttpCode } = require('./constants')

const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        const token = req.get('Authorization')?.split(' ')[1]
        if (!user || err || token !== user.token) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                // на вебинаре FORBIDDEN
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                data: 'Unauthorized',
                message: 'Not authorized',
                // на вебинаре 'Access is denied'
            })
        }
        req.user = user
        return next()
    })(req, res, next)
}

module.exports = guard
