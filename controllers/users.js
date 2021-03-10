const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { HttpCode } = require('../helpers/constants')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

// /auth/register
const register = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await Users.findByEmail(email)
        if (user) {
            return res.status(HttpCode.CONFLICT).json({
                status: 'error',
                code: HttpCode.CONFLICT,
                data: 'Conflict',
                message: 'Email in use',
            })
        }

        const newUser = await Users.create(req.body)
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                // id: newUser.id,
                email: newUser.email,
                subscription: newUser.subscription,
                avatarURL: newUser.avatarURL,
            },
        })
    } catch (e) {
        next(e)
    }
}

// /auth/login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await Users.findByEmail(email)
        const isValidPassword = await user?.validPassword(password)
        if (!user || !isValidPassword) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                data: 'Unauthorized',
                message: 'Email or password is wrong', // или 'Invalid credentials'
            })
        }

        const id = user._id
        const payload = { id } // можно + email + subscription
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' })
        await Users.updateToken(id, token)
        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { token },
        })
    } catch (e) {
        next(e)
    }
}

// /auth/logout
const logout = async (req, res, next) => {
    try {
        const userId = req.user.id
        const loggedUser = await Users.findById(userId)

        if (loggedUser) {
            await Users.updateToken(userId, null)
            return res.status(HttpCode.NO_CONTENT).json({})
        } else {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                data: 'Unauthorized',
                message: 'Not authorized',
            })
        }
    } catch (e) {
        next(e)
    }
}

// /current
const current = async (req, res, next) => {
    try {
        const userId = req.user.id
        const currentUser = await Users.findById(userId)

        if (currentUser) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    email: currentUser.email,
                    subscription: currentUser.subscription,
                },
            })
        } else {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                data: 'Unauthorized',
                message: 'Not authorized',
            })
        }
    } catch (e) {
        next(e)
    }
}

module.exports = { register, login, logout, current }
