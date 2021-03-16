import React from 'react'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import logo from '../images/logo.png'
import ExpenseVid from '../images/Expenses.mov'
import ContactVid from '../images/Contacts.mov'

const Index = () => {

    return <div>
        <div className='header'>
            <img className='logo' src={logo} />
            <Link to='/login' className='link'><AccountCircleIcon className='link' /></Link>
            {/* <Link className='links' to="/login">Login</Link> */}
            {/* <Link className='links' to="/login">Sign Up</Link> */}
        </div>

        <main className='main'>
            <div className='img-hand'>
                <div>
                    <h2 className='collab'>Co-parent collaboration
                    made simple</h2>
                </div>
            </div>


            <div className='view2'>
                <div>
                    <p className='paragraph'>
                        Let <span className='complimentary'>CoFamilia </span>handle the "<span className='complimentary'>co</span>" in <span className='complimentary'>co</span>-parenting so you have more time <br />for just parenting.</p>
                    <h2 className='heading-text'>Get Organized</h2>
                    <hr color=''></hr>
                </div>


                <div className='view3'>

                    <h2 className='heading-text'>Manage Expenses</h2>
                    <video className='expenses-vid' autoPlay loop muted>
                        <source src={ExpenseVid} type='video/mp4' />
                    </video>
                    <p className='paragraph1'>Keep track of shared expenses.
                <br />
                        <br />
                Solve financial responsibility challenges quicker and without confusion.</p>
                </div>

                <div className='view4'>
                    <h2 className='heading-text'>Share Contacts</h2>
                    <video className='contacts-vid' autoPlay loop muted>
                        <source src={ContactVid} type='video/mp4' />
                    </video>
                    <p className='paragraph1'>Easily access the numbers of people most important to your children.
                <br />
                        <br />
                The number you need, when you need it.</p>
                </div>

                <div className='view5'>
                    <div className='mom-kids-img'>
                        <div>
                            <p className='paragraph2'><span className='complimentary'>Co</span>llaborate.</p>
                        </div>
                        <div>
                            <p className='paragraph2'><span className='complimentary'>Co</span>mmunicate.</p>
                        </div>
                        <div>
                            <p className='paragraph2'><span className='complimentary'>Co</span>Familia.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='footer'>
                    <h2>© 2021 | CoFamilia | Designed by IFY, LLC. All Rights Reserved.</h2>
                </div>
            </div>
        </main>
    </div>
}

export default Index