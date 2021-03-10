import React, { Component } from 'react'

class Expenses extends Component {
    constructor(){
        super()
        this.state = {
            date: '',
            description: '',
            amount: ''
        }
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addExpense = e => {
        
    }

    render(){
        return <div>
            <div>
                <form onSubmit={ this.addExpense }>
                    <label>Description: </label>
                    <input  type='text'
                            placeholder='description' 
                            name='description'/>
                    <label>Amount: $</label>
                    <input  type='number' 
                            min='1'
                            step='any'
                            name='amount'/>
                    <input  type='submit'
                            value='Add Expense' />
                </form>
            </div>
    </div>
    }
}

export default Expenses