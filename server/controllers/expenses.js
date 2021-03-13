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
            await db.expenses.add_expense([ amount, description, child.child_id ])
            const expenses = await db.expenses.get_expenses([ child.child_id ])
            return res.status(200).send(expenses)
        } else {
            return res.status(401).send('Please log in to add an expense.')
        }
    },
    updateExpense: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { amount, description } = req.body
            const { expense_id } = req.params
            const updatedExpense = await db.expenses.update_expense([ amount, description, expense_id ])
            return res.status(200).send(updatedExpense)
        } else {
            return res.status(401).send('Please log in to update an expense.')
        }
        
    },
    deleteExpense: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { expense_id } = req.params
            await db.expenses.delete_expense( expense_id )
            const [ child ] = await db.child.get_child([ req.session.user.userId ])
            const expenses = await db.expenses.get_expenses([ child.child_id ])
            return res.status(200).send(expenses)
        } else {
            return res.status(401).send('Please log in to delete an expense.')
        }
    }
}