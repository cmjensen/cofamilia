import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../redux/userReducer'
import ExpenseItem from './ExpenseItem'

class Expenses extends Component {
    constructor(){
        super()
        this.state = {
            expenses: [],
            amount: '',
            description: '',
            expense_id: '',
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

    addExpense = async e => {
        e.preventDefault(e)
        const { amount, description } = this.state
        try {
            const expenses = await axios.post('/api/expense', { amount, description })
            this.setState({
                expenses: expenses.data
            })
            alert('Expense added')
        }
        catch {
            alert('Failed to add expense')
        }
    }

    updateExpense = async (expense_id) => {
        try {
            const expenses = await axios.updateExpense(`/api/expense/${ expense_id }`)
            this.setState({
                expenses: expenses.data
            })
            alert('Expense edited')
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
            alert('Expense deleted')
        }
        catch {
            alert('Failed to delete expense')
        }
    }


    render(){
        const mappedExpenses = this.state.expenses.map( expense => {
            const { expense_id, amount, description } = expense
            return <ExpenseItem key={ expense_id } amount={ amount } description ={ description } id={ expense_id } updateExpense = { () => this.updateExpense(expense_id)} deleteExpense={ () => this.deleteExpense(expense_id) }/>
        })

        return <div>
            <div>
                <form onSubmit={ this.addExpense }>
                    <label>Amount: $</label>
                    <input  type='number'
                            min='1'
                            step='any'
                            name='amount'
                            value={ this.state.amount }
                            onChange={ this.changeHandler }/>
                    <label>Description: </label>
                    <input  type='text'
                            placeholder='description' 
                            name='description'
                            value={ this.state.description }
                            onChange={ this.changeHandler }/>
                    <input  type='submit'
                            value='Add Expense' />
                </form>
                <div>
                    { mappedExpenses }
                </div>
            </div>
          
    </div>
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getUser })(Expenses)