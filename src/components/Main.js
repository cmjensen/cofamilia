import React from 'react'
// import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../redux/userReducer'

class Main extends React.Component {
    constructor(){
        super()
        this.state = {
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

    render(){
        return <div>
                    <h2>Status: Pending</h2>
                    <h2>Please provide your co-parent with this code to use when registering:</h2>
                    <h2>Code: {this.props.user.child_code}</h2>
                    <h3>You will be able to access CoFamilia once your co-parent has created an account and joined with yours.</h3>
                
        </div>
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getUser })(Main)