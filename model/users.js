const User = require('./schemas/user')

const findByEmail = async email => {
    return await User.findOne({ email })
}

const findById = async id => {
    return await User.findOne({ _id: id })
}

const create = async ({ email, password, subscription }) => {
    const user = new User({ email, password, subscription })
    console.log(user)
    return await user.save()
}

const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token })
}

const updateAvatar = async (id, avatar) => {
    return await User.updateOne({ _id: id }, { avatar })
}

const updateUser = async (id, body) => {
    return await User.updateOne({ _id: id }, { ...body })
}

module.exports = {
    findByEmail,
    findById,
    create,
    updateToken,
    updateAvatar,
    updateUser,
}
