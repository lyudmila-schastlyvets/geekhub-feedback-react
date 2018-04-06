import React, {Component} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Route, Switch} from 'react-router-dom'
import logo from './images/logo-geekhub.png'

import PrivateRoute from './components/Private'

import Home from './components/Home'
import Feedback from './components/Feedback'
import Teachers from './components/TeachersList'
import SendingLetters from './components/SendingLetters'
import Login from './components/Login'
import Comments from './components/Comments'
import Teacher from './components/Teacher'
import NotFound from './components/NotFound'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedIn: localStorage.getItem('loggedIn')
        }
    }

    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <div className='header-bg'>
                        <div className="container header-responsive">
                          <a href="http://geekhub.ck.ua/"><img className='logo' src={logo} alt='geekhub-logo'/></a>
                          <h1 className='App-title'>Feedback System</h1>
                        </div>
                    </div>
                </header>
                <div className='routes'>
                    <Switch>
                        <PrivateRoute exact path='/' component={Home}/>
                        <PrivateRoute exact path='/admin' component={Home}/>
                        <PrivateRoute path='/admin/feedback' component={Feedback}/>
                        <PrivateRoute path='/admin/teachers' component={Teachers}/>
                        <PrivateRoute path='/admin/teacher/:id' component={Teacher}/>
                        <PrivateRoute path='/admin/sending_letters' component={SendingLetters}/>
                        <Route path='/admin/login' component={Login}/>
                        <Route path='/feedback/:id' component={Comments}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                <div className='footer'>Copyright &#169; GeekHub 2018</div>
            </div>
        )
    }
}

export default App