import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { loginUser } from '../redux/userReducer'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            f_name: '',
            l_name: '',
            email: '',
            password: '',
            child_code: '',
            newUser: false
        }
    }

    login = async (e) => {
        e.preventDefault(e)
        const { email, password } = this.state
        try {
            const user = await axios.post('/api/auth/login', { email, password })
            this.props.loginUser(user.data)
            this.props.history.push('/main')
        }
        catch {
            alert('Failed Login Attempt')
        }
    }

    register = async (e) => {
        e.preventDefault()
        const { f_name, l_name, email, password, child_code } = this.state
        try {
            const user = await axios.post('/api/auth/register', { f_name, l_name, email, password, child_code })
            this.props.loginUser(user.data)
            //if has child_code then 
            this.props.history.push('/main')
        }
        catch {
            alert('Failed Registration Attempt')
        }
    }

    toggleNewUser = () => {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return <div className='login'>  
                {!this.state.newUser ?
                    <form onSubmit={ this.login }>
                        <h1>CoFamilia</h1>
                        <div className='login-inputs'>
                        <div>
                            <MailOutlineIcon />
                            <input  type='text'
                                    className='input-field'
                                    placeholder='Email Address: '
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.changeHandler}/>
                        </div>
                        <div>
                            <LockOpenIcon />
                            <input  type='password'
                                    placeholder='Password: '
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.changeHandler}/>
                        </div>
                            </div>
                            <div>
                                <input  type='submit'
                                        value='SIGN IN'
                                        className='auth-btn' />
                            </div>
                        <h3>Don't have an account?</h3>
                        <button className='auth-btn' onClick={this.toggleNewUser}>SIGN UP</button>
                    </form>
                    :
                    <form onSubmit={ this.register }>
                    <h2>SIGN UP</h2>
                    <label>First Name </label>
                    <input  type='text'
                            placeholder='first name'
                            name='f_name'
                            value={this.state.f_name}
                            onChange={this.changeHandler}/>
                    <label>Last Name </label>
                    <input  type='text'
                            placeholder='last name'
                            name='l_name'
                            value={this.state.l_name}
                            onChange={this.changeHandler}/>
                    <label>Email </label>
                    <input  type='text'
                            placeholder='email'
                            name='email'
                            value={this.state.email}
                            onChange={this.changeHandler}/>
                    <label>Password </label>
                    <input  type='password'
                            placeholder='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.changeHandler}/>
                    <label>Have a Code From Your Co-Parent?</label>
                    <input  type='text'
                            placeholder='code'
                            name='child_code'
                            value={this.state.child_code}
                            onChange={this.changeHandler}/>
                    <input  type='submit'
                            value='Sign up'/>
                    <h3>Already have an account?</h3>
                    <button className='auth-btn' onClick={this.toggleNewUser}>Login</button>
                    </form>
            }
            </div>
        }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { loginUser })(Auth)