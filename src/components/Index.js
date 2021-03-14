import React from 'react'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { SpaRounded } from '@material-ui/icons';

const Index = () => {

    return <div>
        <div className='header'>
            <h1 className='main-logo'>CoFamilia</h1>
            <Link to='/login' className='link'><AccountCircleIcon className='link'/></Link>
                {/* <Link className='links' to="/login">Login</Link> */}
                {/* <Link className='links' to="/login">Sign Up</Link> */}
        </div>

        <main className='main'>
            <div id='img' >
                <div className='transparent-box'>
                    <h2 className='collab'>Co-parent collaboration 
                    made simple</h2>
                </div>
                
            </div>
            
            {/* middle */}
            <div className='view2'>
                    <h2 className='heading-text'>Get Organized</h2>
                    
                    <h3>
                        Effective organization starts with effective tools. 
                    <br/>
                        Let <span className='complimentary'>CoFamilia </span>
                        handle the "<span className='complimentary'>co</span>" in  <span className='complimentary'>co</span>
                        -parenting 
                        <br/>
                        so you have more time for just parenting.</h3>
            </div>

            {/* left */}
            <div className='view3'>
                    <h2 className='heading-text'>Manage Expenses</h2>
                    <h3>Keep track of shared expenses. Solve financial responsibility challenges quicker and without confusion.</h3>
            </div>

            {/* right */}
            <div className='view4'>
                    <h2 className='heading-text'>Share Contacts</h2>
                    <h3>Easily access the numbers of people most important to your children. Reduce cross-parent communication errors with our joint contact list. Have the number you need, when you need it.</h3>
            </div>
            
            <div className='footer'>
                    <h2>© 2021 | CoFamilia | Designed by IFY, LLC. All Rights Reserved.</h2>
            </div>
        </main>
    </div>
}

export default Index