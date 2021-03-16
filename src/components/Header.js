import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, logoutUser } from '../redux/userReducer'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from '../images/logo.png'

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
        <div className='header1'>
           <img className='logo' src={ logo } />
            <ExitToAppIcon className='exit' color='white' style={{ fontSize: 50 }} onClick={ this.logout }/>
        </div>
        
    </div>
}

}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { getUser, logoutUser })(Header)) 