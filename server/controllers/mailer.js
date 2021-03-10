require('dotenv').config()
const nodemailer = require('nodemailer')

const { EMAIL, EMAIL_PASS } = process.env

module.exports = {
    sendEmail: async ( req, res ) => {
        const { f_name, l_name, child_code } = req.session.user
        const { co_email } = req.body
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: EMAIL_PASS
            }
        })
        let message = {
            from: 'cofamilia.app@gmail.com',
            to: co_email,
            subject: 'Invite to Sign up for CoFamilia',
            text: `I got my mailer system to work on my app and it's awesomeeeeeeeee. (Not actually an invite sry)`
        }
        transporter.sendMail( message, function( err ) {
            if (err) {
                console.log( err )
                res.sendStatus(500)
             } else {
                 console.log('Email Sent Successfully')
                 res.sendStatus(200)
             }
        }) 
    }
}