require('dotenv').config()

const { EMAIL, EMAIL_PASS } = process.env

module.exports = {
    sendEmail: async ( req, res ) => {
        const db = req.app.get('db')
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: EMAIL_PASS
            }
        })
        let message = {
            from: 'support@cofamilia.dev',
            to: email,
            subject: 'Join CoFamilia',
            text: 'Hey.',
            html: "<p>Hey</p>"
        }
        transporter.sendMail( message, function( err ) {
            if (err) {
                console.log( err )
             } else (console.log('Email Sent Successfully'))
        })
    }
}