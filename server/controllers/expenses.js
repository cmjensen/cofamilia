module.exports = {
    getExpenses: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const [ child ] = await db.child.get_child([ req.session.user.userId ])
            const expenses = await db.expenses.get_expenses([ child.child_id ])
            return res.status(200).send(expenses)
        } else {
            return res.status(401).send('Please log in to see expenses.')
        }
    },
    addExpense: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { amount, description } = req.body
            const [ child ] = await db.child.get_child([ req.session.user.userId ])
            const newExpense = await db.expenses.add_expense([ amount, description, child.child_id ])
            const expenses = await db.expenses.get_expenses([ child.child_id ])
            return res.status(200).send(expenses)
        } else {
            return res.status(401).send('Please log in to add an expense.')
        }
    },
    updateExpense: async ( req, res ) => {
        const db = req.app.get('db')
        
    },
    deleteExpense: ( req, res ) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.expenses.delete_expense( id ).then( res.sendStatus(200) )
    }
}