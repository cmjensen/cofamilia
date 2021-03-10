import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './components/Auth'
import Main from './components/Main'
import Home from './components/Home'
import Expenses from './components/Expenses'

export default (
    <Switch>
        <Route exact path='/' component={ Auth }/>
        <Route path='/main' component={ Main }/>
        <Route path='/home' component={ Home }/>
        <Route path='/expenses' component={ Expenses }/>
    </Switch>
)