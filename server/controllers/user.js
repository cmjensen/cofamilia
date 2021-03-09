const bcrypt = require('bcryptjs')

module.exports = {
    register: async ( req, res ) => {
        const db = req.app.get('db')
        const { f_name, l_name, email, password, child_code } = req.body
        const [foundUser] = await db.user.find_user_by_email([ email ])
        if( foundUser ){
            return res.status(400).send(`An account with email ${ email } already exists.`)
        }
        const salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync( password, salt )
        const [newUser] = await db.user.create_user([ f_name, l_name, email, hash ])
        const [updateChild] = await db.child.update_child([ newUser.user_id, child_code ])
        const [newCode] = await db.child.get_child([ newUser.user_id ])
        req.session.user = {
            userId: newUser.user_id,
            f_name: newUser.f_name,
            l_name: newUser.l_name,
            email: newUser.email,
            child_code: newCode.child_code
        }
        res.status(200).send(req.session.user)
        console.log(req.session.user)
    },
    login: async ( req, res ) => {
        const db = req.app.get('db')
        const { email, password } = req.body
        const [ foundUser ] = await db.user.find_user_by_email([ email ])
        const [childCode] = await db.child.get_child([ foundUser.user_id ])
        if( !foundUser ){
            return res.status(400).send('Incorrect login credentials.')
        }
        const authenticated = bcrypt.compareSync( password, foundUser.password)
        if( authenticated ){
            req.session.user = {
                userId: foundUser.user_id,
                f_name: foundUser.f_name,
                l_name: foundUser.l_name,
                email: foundUser.email,
                child_code: childCode.child_code
            }
            res.status(200).send(req.session.user)
            console.log(req.session.user)
        } else {
            res.status(401).send('Incorrect login credentials.')
        }
    },
    logoutUser: ( req, res ) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: ( req, res ) => {
        if( req.session.user ){
            res.status(200).send( req.session.user )
        } else {
            res.status(404).send('Please log in.')
        }
    }
}