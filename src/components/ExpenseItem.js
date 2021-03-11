import React from 'react'

const ExpenseItem = (props) => {
    const { amount, description, id, updateExpense, deleteExpense } = props

    return <div>
            <h1>{ amount }</h1>
            <h1>{ description }</h1>
            <button onClick={() => updateExpense(id)}>Edit</button>
            <button onClick={() => deleteExpense(id)}>Delete</button>
        </div>
}

export default ExpenseItem