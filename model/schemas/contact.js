const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
            min: 3,
            max: 10,
        },
        email: {
            type: String,
            required: [true, 'Set email for contact'],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, 'Set email for contact'],
            unique: true,
            min: 10,
        },
        subscription: {
            type: String,
            required: [true, 'Set subscription for contact'],
        },
        password: {
            type: String,
            required: [true, 'Set password for contact'],
            unique: true,
            min: 5,
        },
        token: String,
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

const Contact = model('contact', contactSchema)

module.exports = Contact
