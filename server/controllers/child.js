module.exports = {
    getChild: async ( req, res ) => {
        const db = req.app.get('db')
        const { userId } = req.session.user
        const [allChildren] = await db.child.get_child([ userId ])
        return res.status(200).send(allChildren)
    },
    addChild: async ( req, res ) => {
        const db = req.app.get('db')
        const { child_name, email } = req.body

        let [user] = await db.user.find_user_by_email([ email ])
        if( !user ) user = { user_id: null }
        
        if( req.session.user ){
            const { userId } = req.session.user
            const child_code = Math.floor(Math.random() * 1000000)
            const newChild = await db.child.add_child([ userId, user.user_id, child_name, child_code ])
            return res.status(200).send(newChild)
        } else {
            return res.status(401).send('Please log in to add a child.')
        }
    },
    checkJoin: async ( req, res ) => {
        const db = req.app.get('db')
        const { userId } = req.session.user
        const [ isJoined ] = await db.child.check_join([ userId ])
        console.log(isJoined)
        return res.status(200).send(isJoined)
    }
}