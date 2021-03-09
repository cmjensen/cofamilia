module.exports = {
    getContacts: async ( req, res ) => {
        const db = req.app.get('db')
        const allContacts = await db.contacts.all_contacts()
        return res.status(500).send(allContacts)
    },
    addContact: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { user_id } = req.session.user
            const { contact_f_name, contact_l_name, number } = req.body
            const newContact = await db.contacts.create_contact([ contact_f_name, contact_l_name, number, user_id ])
            return res.status(200).send(newContact)
        } else {
            return res.status(401).send('Please log in to add a contact.')
        }
    },
    updateContact: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { id } = req.params
            const { user_id } = req.session.user
            const { contact_f_name, contact_l_name, number } = req.body
            const updatedContact = await db.contacts.update_contacts([ id, contact_f_name, contact_l_name, number, user_id ])
            return res.status(200).send(updatedContact)
        } else {
            return res.status(401).send('Please log in to update an expense.')
        }
    },
    deleteContact: ( req, res ) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.contacts.delete_contact( id ).then( res.sendStatus(200) )
    }
}