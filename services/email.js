const Mailgen = require('mailgen')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

class EmailService {
    #sender = sgMail
    #GenerateTemplate = Mailgen
    constructor(env) {}
    #createTemplate(verificationToken, name = 'Guest') {}
    sendEmail(verificationToken, email, name) {}
}

module.exports = EmailService
