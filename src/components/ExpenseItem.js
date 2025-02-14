import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Typography from '@material-ui/core/Typography';

const ExpenseItem = (props) => {
    const { id, updateExpense, deleteExpense } = props

    const [editMode, setEditMode] = useState(false)
    const [amount, setAmount] = useState(props.amount)
    const [description, setDescription] = useState(props.description)
    const total = `$ ${ amount }`
    // const [owed, setOwed] = useState(0)

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
            <div className='expense-display'>
                <List className='expense-data'>
                    <div className='expense-item'>
                        <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                            <MonetizationOnIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={ total }
                            secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary">
                                    { description }
                                  </Typography>
                                  <div>
                                  {'Amount owed: $'}
                                  { amount / 2 }
                                  </div>
                                </React.Fragment>
                            }
                            />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <div>
                                    <EditIcon onClick={() => setEditMode(!editMode)}/>
                                    <DeleteIcon onClick={() => deleteExpense(id)} />
                                </div>
                            </IconButton>
                        </ListItemSecondaryAction>
                        </ListItem>
                    </div>
                </List>
            </div>
        </div>

}

export default ExpenseItem