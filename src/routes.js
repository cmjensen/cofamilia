import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './components/Auth'
import Main from './components/Main'
import Home from './components/Home'
import Expenses from './components/Expenses'
import Calendar from './components/Calendar'
import Contacts from './components/Contacts'

export default (
    <Switch>
        <Route exact path='/' component={ Auth }/>
        <Route path='/main' component={ Main }/>
        <Route path='/home' component={ Home }/>
        <Route path='/calendar' component={ Calendar }/>
        <Route path='/expenses' component={ Expenses }/>
        <Route path='/contacts' component={ Contacts }/>
    </Switch>
)