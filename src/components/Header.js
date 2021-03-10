import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, logoutUser } from '../redux/userReducer'

class Header extends React.Component {
    constructor(){
        super()
        this.state = {
            isLoggedIn: true
        }
    }
    
    componentDidMount(){
        this.props.getUser()
    }

    logout = () => {
        axios.post('/api/auth/logout')
            .then(() => {
                this.props.logoutUser()
                this.props.history.push('/')
            })
    }

    render(){
    return <div>
        { this.props.isLoggedIn ?
       <div className='header'>
            <h5>Welcome { this.props.user.f_name } { this.props.user.l_name }</h5>
            <div className='nav'>
                    <Link className='links' to="home">Home</Link>
                    <Link className='links' to="/expenses">Expenses</Link>
                    <button onClick={ this.logout }>Logout</button>
            </div>
        </div>
        :
        <Link to='/' />
        }
    </div>
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { getUser, logoutUser })(Header)) 