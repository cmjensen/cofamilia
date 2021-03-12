import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const ExpenseItem = (props) => {
    const { id, updateExpense, deleteExpense } = props

    const [editMode, setEditMode] = useState(false)
    const [amount, setAmount] = useState(props.amount)
    const [description, setDescription] = useState(props.description)

    return editMode ? <div>
        <input  value={ amount }
                onChange={(e) => setAmount(e.target.value)}/>
        <input  value={ description }
                onChange={(e) => setDescription(e.target.value)}/>
        <button onClick={() => {
            updateExpense(amount, description, id)
            setEditMode(false)}}>Save</button>
    </div>
        :
        <div>
            <h1>{amount}</h1>
            <h1>{description}</h1>
            <button><EditIcon onClick={() => setEditMode(!editMode)}/></button>
            <button><DeleteIcon onClick={() => deleteExpense(id)} /></button>
        </div>

}

export default ExpenseItem