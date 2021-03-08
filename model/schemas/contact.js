const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

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
            required: [true, 'Set email for contact'],
        },
        phone: {
            type: String,
            required: [true, 'Set email for contact'],
            unique: true,
            min: 10,
        },
        subscription: {
            type: String,
            default: 'free',
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

contactSchema.plugin(mongoosePaginate)
const Contact = model('contact', contactSchema)

module.exports = Contact
