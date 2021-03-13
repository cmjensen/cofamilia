import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Index from './components/Index'
import Login from './components/Login'
import Status from './components/Status'
import Home from './components/Home'
import Expenses from './components/Expenses'
import Contacts from './components/Contacts'

export default (
    <Switch>
        <Route exact path='/' component={ Index }/>
        <Route path='/login' component={ Login } />
        <Route path='/status' component={ Status }/>
        <Route path='/home' component={ Home }/>
        <Route path='/expenses' component={ Expenses }/>
        <Route path='/contacts' component={ Contacts }/>
    </Switch>
)