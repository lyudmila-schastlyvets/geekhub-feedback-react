import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/Private'

import Home from './components/Home'
import Feedback from './components/Feedback'
import Teachers from './components/TeachersList'
import SendingLetters from './components/SendingLetters'
import Login from './components/Login'
import Comments from './components/Comments'
import addTeacher from './components/FormTeacher'
import Teacher from './components/Teacher'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('loggedIn')
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Geekhub charity project</h1>
        </header>
        <div className='routes'>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute path='/admin/feedback' component={Feedback} />
            <PrivateRoute path='/admin/teachers' component={Teachers} />
            <PrivateRoute path='/admin/add_teacher' component={addTeacher} />
            <PrivateRoute path='/admin/teacher' component={Teacher} />
            <PrivateRoute path='/admin/sending_letters' component={SendingLetters} />
            <Route path='/admin/login' component={Login} />
            <Route path='/feedback/:id' component={Comments}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App