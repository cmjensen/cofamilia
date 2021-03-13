import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../redux/userReducer'
import ExpenseItem from './ExpenseItem'
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

class Expenses extends Component {
    constructor(){
        super()
        this.state = {
            expenses: [],
            amount: '',
            description: '',
            expense_id: '',
            addingExpense: false,
        }
    }

    componentDidMount(){
        this.props.getUser()
        axios.get('/api/expenses').then( res => {
            this.setState({
                expenses: res.data
            })
        }).catch( err => console.log( err ))
    }
    

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleAddingExpense = () => {
        this.setState({
            addingExpense: !this.state.addingExpense
        })
    }

    addExpense = async e => {
        e.preventDefault(e)
        const { amount, description } = this.state
        try {
            const expenses = await axios.post('/api/expense', { amount, description })
            this.setState({
                expenses: expenses.data,
                addingExpense: !this.state.addingExpense
            })
        }
        catch {
            alert('Failed to add expense')
        }
    }

    updateExpense = async (amount, description, expense_id) => {
        try {
            const expenses = await axios.put(`/api/expense/${ expense_id }`, { amount, description })
            this.setState({
                expenses: expenses.data
            })
        }
        catch {
            alert('Failed to edit expense')
        }
    }

    deleteExpense = async (expense_id) => {
        try {
            const expenses = await axios.delete(`/api/expense/${ expense_id }`)
            this.setState({
                expenses: expenses.data
            })
        }
        catch {
            alert('Failed to delete expense')
        }
    }


    render(){
        const mappedExpenses = this.state.expenses.map( expense => {
            const { expense_id, amount, description } = expense
            return <ExpenseItem key={ expense_id } amount={ amount } description ={ description } id={ expense_id } updateExpense = {this.updateExpense} deleteExpense={this.deleteExpense}/>
        })

        return <div>
                <div>
                    { mappedExpenses }
                </div>
            { this.state.addingExpense ? 
                // <form onSubmit={ this.addExpense }>
                    <div className='add-exp'>
                        <TextField  id="outlined-basic"
                                    label="Amount" 
                                    variant="outlined" 
                                    name='amount'
                                    value={ this.state.amount } 
                                    onChange={ this.changeHandler }/>
                        
                        <TextField  id="outlined-basic" 
                                    label="Description" 
                                    variant="outlined" 
                                    name='description'
                                    value={ this.state.description }
                                    onChange={ this.changeHandler }/>
                        <ArrowUpwardIcon onClick={() => this.addExpense } />
                    </div>
                // </form>
                :
                <div className='expense-display'>
                    <AddIcon onClick={this.toggleAddingExpense}/>
                </div>
                }
            </div>
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getUser })(Expenses)