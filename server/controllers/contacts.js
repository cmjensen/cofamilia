module.exports = {
    getContacts: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const [ child] = await db.child.get_child([ req.session.user.userId ])
            const contacts = await db.contacts.get_contacts([ child.child_id ])
            return res.status(200).send(contacts)
        } else {
            return res.status(401).send('Please log in to see contacts.')
        }
    },
    addContacts: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { contact_f_name, contact_l_name, number, category } = req.body
            const [child ] = await db.child.get_child([ req.session.user.userId ])
            await db.contacts.add_contact([ contact_f_name, contact_l_name, number, category, child.child_id ])
            const contacts = await db.contacts.get_contacts([ child.child_id ])
            return res.status(200).send(contacts)
        } else {
            return res.status(401).send('Please log in to add a contact.')
        }
    },
    updateContact: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { contact_f_name, contact_l_name, number, category } = req.body
            const { contact_id } = req.params
            const updatedContact = await db.contacts.update_contact([ contact_f_name, contact_l_name, number, category, contact_id ])
            return res.status(200).send(updatedContact)
        } else {
            return res.status(401).send('Please log in to update a contact.')
        }
    },
    deleteContact: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { contact_id } = req.params
            await db.contacts.delete_contact( contact_id )
            const [ child ] = await db.child.get_child([ req.session.user.userId ])
            const contacts = await db.contacts.get_contacts([ child.child_id ])
            return res.status(200).send(contacts)
        } else {
            return res.status(401).send('Please log in to delete a contact.')
        }
    }
}