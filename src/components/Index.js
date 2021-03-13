import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
    return <div>
        <div className='header'>
            <h1>CoFamilia</h1>
            <div className='nav'>
                <Link className='links' to="/login">Login</Link>
                <Link className='links' to="/login">Sign Up</Link>
            </div>
        </div>

            <main className='main'>
                <h2>Co-parenting collaboration made simple</h2>
            </main>
    </div>
}

export default Index