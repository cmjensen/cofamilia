import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { loginUser } from '../redux/userReducer'
import logo from '../images/logo.png'

class Login extends Component {
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
            if(email || password ){
                const user = await axios.post('/api/auth/login', { email, password })
                this.props.loginUser(user.data)
                this.props.history.push('/status')
            } else {
                alert('Please enter an email and password.')
            }
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
            this.props.history.push('/status')
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
                        
                        <div className='login-inputs'>
                        <div>
                        <div>
                        <img className='logo-auth' src={logo} />
                        </div>
                            <label>Email Address</label>
                            <input  type='text'
                                    className='input-field'
                                    autoComplete='off'
                                    placeholder='Email'
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.changeHandler}/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input  type='password'
                                    className='input-field'
                                    autoComplete='off'
                                    placeholder='Password'
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.changeHandler}/>
                        </div>
                        <br />
                            <div>
                                <input  type='submit'
                                        value='Sign In'
                                        className='auth-btn' />
                            </div>
                        <h3>Don't have an account?</h3>
                        <button className='auth-btn' onClick={this.toggleNewUser}>Create An Account</button>
                        </div>
                    </form>
                    :
                    <form onSubmit={ this.register }>
                    <div className='login-inputs'>
                        <label>First Name </label>
                        <input  type='text'
                                placeholder='First Name'
                                className='input-field'
                                name='f_name'
                                value={this.state.f_name}
                                onChange={this.changeHandler}/>
                        <label>Last Name </label>
                        <input  type='text'
                                placeholder='Last Name'
                                className='input-field'
                                name='l_name'
                                value={this.state.l_name}
                                onChange={this.changeHandler}/>
                        <label>Email </label>
                        <input  type='text'
                                placeholder='Email'
                                className='input-field'
                                name='email'
                                value={this.state.email}
                                onChange={this.changeHandler}/>
                        <label>Password </label>
                        <input  type='password'
                                placeholder='Password'
                                className='input-field'
                                name='password'
                                value={this.state.password}
                                onChange={this.changeHandler}/>
                        <label>Have a Code From Your Co-Parent?</label>
                        <input  type='text'
                                placeholder='Code'
                                className='input-field'
                                name='child_code'
                                value={this.state.child_code}
                                onChange={this.changeHandler}/>
                        <input  type='submit'
                                    value='Sign Up'
                                    className='auth-btn'/>
                        <h3>Already have an account?</h3>
                        <button className='auth-btn' onClick={this.toggleNewUser}>Sign in</button>
                        </div>
                    </form>
            }
            </div>
        }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { loginUser })(Login)