import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../redux/userReducer'

class Header extends React.Component {
    
    componentDidMount(){
        this.props.getUser()
    }

    logout = () => {
        axios.post('/auth/logout')
        this.props.history.push('/')
    }

    render(){
    return <div>
        {/* { this.props.isLoggedIn ? */}
       <div className='header'>
            <h5>Welcome { this.props.user.f_name } { this.props.user.l_name }</h5>
            <div className='nav'>
                    <Link className='links' to="home">Home</Link>
                    <Link className='links' to="/calendar">Calendar</Link>
                    <Link className='links' to="/expenses">Expenses</Link>
                    <Link className='links' to="/contacts">Contacts</Link>
            </div>
        </div>
        {/* :
        <Link to='/'>Please Login</Link>
        } */}
    </div>
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getUser })(Header)