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
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';

const ContactItem = (props) => {
    const { id, updateContact, deleteContact } = props

    const [editMode, setEditMode] = useState(false)
    const [contact_f_name, setContactFName] = useState(props.contact_f_name)
    const [contact_l_name, setContactLName] = useState(props.contact_l_name)
    const [number, setNumber] = useState(props.number)
    const [category, setCategory] = useState(props.category)

    const fullName = `${ contact_f_name } ${ contact_l_name }`
    const numberCategory = `${ number }`

    return editMode ? <div>
        <div>
        </div>
        <input  value={ contact_f_name }
                onChange={(e) => setContactFName(e.target.value)} />
        <input  value={ contact_l_name }
                onChange={(e) => setContactLName(e.target.value)} />
        <input  value={ number }
                onChange={(e) => setNumber(e.target.value)} />
        <input  value={ category }
                onChange={(e) => setCategory(e.target.value)} />
        <button onClick={() => {
            updateContact(contact_f_name, contact_l_name, number, category)
            setEditMode(false)
        }}>Save</button>
    </div>
    :
    <div>
        <div className='expense-display'>
            <List className='expense-data'>
                <div className='expense-item'>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                            <PhoneIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={ fullName }
                            secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary">
                                    { number }
                                  </Typography>
                                  <div>
                                  { category }
                                  </div>
                                </React.Fragment>
                            }
                            />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <div>
                                    <EditIcon onClick={() => setEditMode(!editMode)}/>
                                    <DeleteIcon onClick={() => deleteContact(id)} />
                                </div>
                            </IconButton>
                        </ListItemSecondaryAction>
                        </ListItem>
                    </div>
                </List>
        </div>
    </div>
}

export default ContactItem