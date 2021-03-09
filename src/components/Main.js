import axios from 'axios'
import React from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../redux/userReducer'

class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            child_name: '',
            isMatched: false
        }
    }

    componentDidMount() {
        this.props.getUser()
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addChild = async (e) => {
        e.preventDefault(e)
        const { child_name } = this.state
        try {
            const child = await axios.post('/api/child', )
        }
    }

    render(){
        return <div>
            <div>
                <form onSubmit={ this.addChild }>
                    <h1>Please enter the name of the oldest child you share with your co-parent</h1>
                    <label>Child's Name:</label>
                    <input  type='text'
                            placeholder='child name'
                            name='child_name'
                            value={this.state.child_name}/>
                </form>
                <div>
                    <input  type='submit'
                            value='Add Child'/>
                </div>
            </div>
                    <h2>Status: Pending</h2>
                    <h2>Please provide your co-parent with this code to use when registering:</h2>
                    <h2>{this.props.user.child_code}</h2>
                    <h3>You will be able to access CoFamilia once your co-parent has created an account and joined with yours.</h3>
                
        </div>
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getUser })(Main)