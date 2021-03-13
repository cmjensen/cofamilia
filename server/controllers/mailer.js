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
            text: `${ f_name } ${ l_name } has invited you to join CoFamilia. To join accounts with ${ f_name }, please register using this code: ${ child_code }.`
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