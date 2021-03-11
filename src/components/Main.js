import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { getUser } from '../redux/userReducer'

class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            child_name: '',
            co_email: '',
            hasChild: false
        }
    }

    componentDidMount() {
        console.log('hit')
        if(this.props.user.child_code){
            this.setState({
                hasChild: true
            })
        }
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.user.child_code)
        if(this.props.user.child_code && (prevProps.user.child_code !== this.props.user.child_code)){
            this.setState({
                hasChild: true
            })
        }
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
            await axios.post('/api/child', { child_name })
        }
        catch {
            alert('Failed to add child')
        }
    }

    sendEmail = async (e) => {
        e.preventDefault(e)
        const { co_email } = this.state
        try {
            await axios.post('/api/mail', { co_email })
            alert('Email sent')
        }
        catch {
            alert('Failed to send email')
        }
    }


    render(){
        return <div>
            { !this.state.hasChild ?
            <div>
                <form onSubmit={ this.addChild }>
                    <h1>Please enter the name of the oldest child you share with your co-parent</h1>
                    <label>Child's Name:</label>
                    <input  type='text'
                            placeholder='child name'
                            name='child_name'
                            value={ this.state.child_name }
                            onChange={ this.changeHandler }/>
                    <input  type='submit'
                            value='Add Child'/>
                </form>
            </div>
            :
            <div>
                    <h2>Status: Pending</h2>
                    <h2>Please provide your co-parent with this code to use when registering:</h2>
                    <h2>{this.props.user.child_code}</h2>
                    <h3>You will be able to access CoFamilia once your co-parent has created an account and joined with yours.</h3>
                <form onSubmit={ this.sendEmail }>
                    <h2>Send an invitation email to your co-parent with their code:</h2>
                    <label>Co-Parent Email: </label>
                    <input  type='email'
                            placeholder='email'
                            name='co_email'
                            value={ this.state.co_email }
                            onChange={ this.changeHandler }/>
                    <input  type='submit'
                            value='Send Email' />
                </form>
            </div>
            }
        </div>
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getUser })(Main)