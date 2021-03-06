const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
            min: 3,
            max: 30,
        },
        email: {
            type: String,
            // validate(value) {
            //     const re = /\S+@\S+\.\S+/
            //     return re.test(String(value).toLowerCase())
            // },
            default: '',
        },
        phone: {
            type: String,
            required: [true, 'Set email for contact'],
            unique: true,
            min: 10,
        },
        subscription: {
            type: String,
            default: '',
        },
        owner: {
            type: SchemaTypes.ObjectId,
            ref: 'user',
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

const Contact = model('contact', contactSchema)

module.exports = Contact
