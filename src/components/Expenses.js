import React, { Component } from 'react'
import axios from 'axios'
import { MdEdit, MdDelete, MdAdd, MdSearch } from 'react-icons/md'

class Expenses extends Component {
    constructor(){
        super()
        this.state = {
            expenses: []
        }
    }

    componentDidMount() {
        axios.get('/api/expenses')
            .then(res => {
                this.setState({
                    expenses: res.data
                })
            }).catch(err => console.log(err))
    }

    addExpense(amount, description){
        axios.post('/api/expense', {amount, description}).then( res=> {
            this.setState({
                expenses: res.data
            }).catch(err => console.log(err))
        })
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const mappedExpenses = this.state.expenses.map( expense => {
            return <div>
            {expense.amount}
            {expense.description}
            </div>
        })
        return <div>
            <form>
                <input  type='text'
                        placeholder='search'
                        name='search'
                        />
                <MdSearch />
            </form>
            <div className='expenses-box'>
                <div className='user-expenses'>
                    { mappedExpenses }
                    <h3>Owed</h3>
                    <h3>Owed</h3>
                </div>
                <div className='expense-data'>
                    <h3>Description</h3>
                    <h3>Amount</h3>
                </div>
                <div className='expense-btns'>
                    <input  type='submit'
                            value='MdEdit'
                            />
                    <button><MdEdit /></button>
                    <button><MdDelete /></button>
                </div>
            </div>
            <button onClick={this.addExpense}><MdAdd /></button>
            <input  name='amount'
                    placeholder='amount'
                    value={this.state.amount}
                    onChange={this.changeHandler}
            />
            <input  name='description'
                    placeholder='description'
                    value={this.state.description}
                    onChange={this.changeHandler}
            />
        </div>
    }
}


export default Expenses