import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, logoutUser } from '../redux/userReducer'
import HomeIcon from '@material-ui/icons/Home';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ContactsIcon from '@material-ui/icons/Contacts';
import PersonIcon from '@material-ui/icons/Person';

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
        {/* { this.props.isLoggedIn ? */}
       <div className='header'>
           <div className='header-logo'>LOGO</div>
            <h2>Welcome { this.props.user.f_name}</h2>
            <PersonIcon color='primary' style={{ fontSize: 70 }}/>
            {/* <button onClick={ this.logout }>Logout</button> */}
        
        {/* <div className='footer'>
            <Link className='icons' to="home"><HomeIcon color='primary' style={{ fontSize: 80 }}/></Link>
            <Link className='icons' to="/expenses"><CreditCardIcon color='primary' style={{ fontSize: 80 }}/></Link>
            <Link className='icons' to="/contacts"><ContactsIcon color='primary' style={{ fontSize: 70 }}/></Link>
        </div> */}

        {/* </div> */}
     </div>
     </div>
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { getUser, logoutUser })(Header)) 