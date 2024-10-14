import React from 'react'
import Header from '../common/header/Header'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Home from '../home/Home'
import About from '../about/About'
import Services from '../service/Service'
import Blog from '../blog/Blog'
import Contact from '../contact/Contact'
export default function Pages() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path='/'component={Home}/>
            </Switch>
            <Switch>
                <Route exact path='/about'component={About}/>
            </Switch>
            <Switch>
                <Route exact path='/services'component={Services}/>
            </Switch>
            <Switch>
                <Route exact path='/blog'component={Blog}/>
            </Switch>
            <Switch>
                <Route exact path='/contact'component={Contact}/>
            </Switch>
        </Router>

    )
}
