import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, logoutUser } from '../redux/userReducer'
import HomeIcon from '@material-ui/icons/Home';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ContactsIcon from '@material-ui/icons/Contacts';

class Header extends React.Component {
    constructor(){
        super()
        this.state = {
            isLoggedIn: true,
            isPaired: false

        }
    }
    
    componentDidMount(){
        this.props.getUser()
    }

    componentDidUpdate(prevProps) {
        if(this.props.user.child_code && (prevProps.user.child_code !== this.props.user.child_code)){
            this.setState({
                hasChild: true
            })
        }
    }

    logout = () => {
        axios.post('/api/auth/logout')
            .then(() => {
                this.props.logoutUser()
                this.props.history.push('/')
            })
    }

    render(){
    return <div className='header-footer'>
        {/* { this.props.isLoggedIn && this.props.isPaired ? */}
            <div className='footer1'>
                <Link className='link' to="home"><HomeIcon className='link' color='primary' style={{ fontSize: 80 }}/></Link>
                <Link className='link' to="/expenses"><CreditCardIcon color='primary' style={{ fontSize: 80 }}/></Link>
                <Link className='link' to="/contacts"><ContactsIcon color='primary' style={{ fontSize: 70 }}/></Link>
            </div> 
           
        </div>
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { getUser, logoutUser })(Header)) 