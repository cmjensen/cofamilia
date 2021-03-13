import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../redux/userReducer'
import ContactItem from './ContactItem'
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

class Contacts extends Component {
    constructor(){
        super()
        this.state = {
            contacts: [],
            contact_f_name: '',
            contact_l_name: '',
            number: '',
            category: '',
            contact_id: '',
            addingContact: false,
        }
    }

    componentDidMount(){
        this.props.getUser()
        axios.get('/api/contacts').then( res => {
            this.setState({
                contacts: res.data
            })
        }).catch( err => console.log( err ))
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleAddingContact = () => {
        this.setState({
            addingContact: !this.state.addingContact
        })
    }

    addContact = async e => {
        const { contact_f_name, contact_l_name, number, category } = this.state
        try {
            const contacts = await axios.post('/api/contact', { contact_f_name, contact_l_name, number, category })
            this.setState({
                contacts: contacts.data,
                addingContact: !this.state.addingContact
            })
        } 
        catch {
            alert('Failed to add contact')
        }
    }

    updateContact = async ( contact_f_name, contact_l_name, number, category, contact_id ) => {
        try {
            const contacts = await axios.put(`/api/contact/${ contact_id }`, { contact_f_name, contact_l_name, number, category })
            this.setState({
                contacts: contacts.data
            })
        }
        catch {
            alert('Failed to edit contact')
        }
    }

    deleteContact = async ( contact_id ) => {
        try {
            const contacts = await axios.delete(`/api/contact/${ contact_id }`)
            this.setState({
                contacts: contacts.data
            })
        }
        catch {
            alert('Failed to delete contact')
        }
    }

    render(){
        const mappedContacts = this.state.contacts.map( contact => {
            const { contact_id, contact_f_name, contact_l_name, number, category } = contact
            return <ContactItem key={ contact_id } contact_f_name={ contact_f_name } contact_l_name={ contact_l_name } number={ number } category={ category } id={ contact_id } updateContact={ this.updateContact } deleteContact={ this.deleteContact } />
        })

    return  <div>
                <div>
                    { mappedContacts }
                </div>
            { this.state.addingContact ?
                <form onSubmit={ this.addContact }>
                    <div className='add-exp'>
                        <TextField  id='outlined-basic'
                                    label='First Name'
                                    variant='outlined'
                                    name='contact_f_name'
                                    value={ this.state.contact_f_name }
                                    onChange={ this.changeHandler }/>
                        <TextField  id='outlined-basic'
                                    label='Last Name'
                                    variant='outlined'
                                    name='contact_l_name'
                                    value={ this.state.contact_l_name }
                                    onChange={ this.changeHandler }/>
                        <TextField  id='outlined-basic'
                                    label='Number'
                                    variant='outlined'
                                    name='number'
                                    value={ this.state.number }
                                    onChange={ this.changeHandler }/>
                        <TextField  id='outlined-basic'
                                    label='Category'
                                    variant='outlined'
                                    name='category'
                                    value={ this.state.category }
                                    onChange={ this.changeHandler }/>
                    </div>
                <button className='add-btn'><ArrowUpwardIcon type='submit' /></button>
                </form>
                :
                <div className='expense-display'>
                    <AddIcon onClick={ this.toggleAddingContact } />
                </div>
            }
            </div>

    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getUser })(Contacts)