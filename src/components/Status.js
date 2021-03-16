import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { getUser } from '../redux/userReducer'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import logo from '../images/logo.png'


class Status extends React.Component {
    constructor(){
        super()
        this.state = {
            child_name: '',
            co_email: '',
            hasChild: false,
            hasQuestion: false
        }
    }

    componentDidMount() {
        this.props.getUser()
        axios.get('/api/child/join').then( res => {
            if( res.data.parent2_id ){
                this.props.history.push('/home')
            } else {
                if(this.props.user.child_code){
                    this.setState({
                        hasChild: true
                    })
                }
            }
        })
    }

    componentDidUpdate(prevProps) {
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

    toggleHasQuestion = () => {
        this.setState({
            hasQuestion: !this.state.hasQuestion
        })
    }

    addChild = async (e) => {
        e.preventDefault(e)
        const { child_name } = this.state
        try {
            await axios.post('/api/child', { child_name })
            this.setState({
                hasChild: true
            })
            // console.log(req.session.user)
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
        return <div className='login'>
            { !this.state.hasChild ?
                    <form onSubmit={ this.addChild }>
                        <div className='login-inputs'>
                        <img className='logo-auth' src={ logo } />
                        <h2 className='please-enter'>Please enter the name of the oldest child you share with your co-parent</h2>
                        <label>Child's Name:</label>
                        <input  type='text'
                                placeholder='child name'
                                autoComplete='off'
                                className='input-field'
                                name='child_name'
                                value={ this.state.child_name }
                                onChange={ this.changeHandler }/>
                        <input  type='submit'
                                className='auth-btn'
                                value='Add Child'/>
                        </div>
                    </form>
            :
            <div className='login-inputs'>
                <img className='logo-auth' src={ logo } />
                    <h2>Status: <span className='complimentary'>Pending</span><HelpOutlineIcon  onClick={ this.toggleHasQuestion }/></h2>
                    { this.state.hasQuestion ?
                    <div className='pending'>
                        <h3>You will be able to access CoFamilia once your co-parent has created an account and joined with yours.</h3>
                    </div>
                    : null }
                    <br></br>
                    <h2>Please provide your co-parent with this code to use when registering:</h2>
                    <div className='code'>
                        <span className='complimentary'>{this.props.user.child_code}</span>
                    </div>
                <div>
                    <form onSubmit={ this.sendEmail }>
                        <h2>Send an invitation email to your co-parent with their code:</h2>
                        <br></br>
                        <label>Co-Parent Email </label>
                        <input  type='email'
                                placeholder='email'
                                autoComplete='off'
                                className='input-field'
                                name='co_email'
                                value={ this.state.co_email }
                                onChange={ this.changeHandler }/>
                        <input  type='submit'
                                value='Send Email'
                                className='auth-btn' />
                    </form>
                </div>
            </div>
            }
        </div>
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getUser })(Status)