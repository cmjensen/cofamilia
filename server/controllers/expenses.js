module.exports = {
    getExpenses: async ( req, res ) => {
        const db = req.app.get('db')
        const allExpenses = await db.expenses.all_expenses()
        return res.status(500).send(allExpenses)
    },
    addExpense: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { user_id } = req.session.user
            const { amount, description } = req.body
            const newExpense = await db.expenses.create_expense([ amount, description, user_id ])
            return res.status(200).send(newExpense)
        } else {
            return res.status(401).send('Please log in to add an expense.')
        }
    },
    updateExpense: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { id } = req.params
            const { user_id } = req.session.user
            const { amount, description } = req.body
            const updatedExpense = await db.expenses.update_expenses([ id, amount, description, user_id ])
            return res.status(200).send(updatedExpense)
        } else {
            return res.status(401).send('Please log in to update an expense.')
        }
    },
    deleteExpense: ( req, res ) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.expenses.delete_expense( id ).then( res.sendStatus(200) )
    }
}