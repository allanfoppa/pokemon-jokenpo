import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Battle from './pages/Battle'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/cadastrar" component={Register} />
                <Route path="/home" component={Home} />
                <Route path="/batalha" component={Battle} />
            </Switch>
        </BrowserRouter>
    )
}