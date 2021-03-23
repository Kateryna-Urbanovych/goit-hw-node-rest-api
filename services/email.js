const Mailgen = require('mailgen')
const sgMail = require('@sendgrid/mail')
const config = require('../config/email.json')

require('dotenv').config()

class EmailService {
    #sender = sgMail
    #GenerateTemplate = Mailgen
    constructor(env) {
        switch (env) {
            case 'development':
                this.link = config.dev
                break
            // для тестов
            // case 'stage':
            //     this.link = config.stage
            //     break
            case 'production':
                this.link = config.prod
                break
            default:
                this.link = config.dev
                break
        }
    }

    #createTemplate(verificationToken, name = 'Guest') {
        const mailGenerator = new this.#GenerateTemplate({
            theme: 'cerberus',
            product: {
                name: 'System Contacts',
                link: this.link,
            },
        })
        const template = {
            body: {
                name,
                intro: 'Заголовок',
                action: {
                    instructions:
                        'Чтобы закончить регистрацию кликните на кнопку',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Подтвердить свой аккаунт',
                        link: `${this.link}/api/users/auth/verify/${verificationToken}`,
                    },
                },
                outro:
                    "Need help, or have questions? Just reply to this email, we'd love to help.",
            },
        }
        return mailGenerator.generate(template)
    }

    async sendEmail(verificationToken, email, name) {
        const emailBody = this.#createTemplate(verificationToken, name)
        this.#sender.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email,
            from: 'no-reply@system-contacts.com', // Use the email address or domain you verified above
            subject: 'Подтверждение регистрации',
            html: emailBody,
        }
        await this.#sender.send(msg)
    }
}

module.exports = EmailService
