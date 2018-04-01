import React, { Component } from 'react'
import './App.css'
import { Route, Link, Switch } from 'react-router-dom'

import Home from './components/admin/home'
import Feedback from './components/admin/feedback'
import Teachers from './components/admin/teachersList'
import SendingLetters from './components/admin/sendingLetters'
import addTeacher from './components/admin/addTeacher'
import Teacher from './components/admin/teacher'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Geekhub charity project</h1>
        </header>
          <nav>
              <Link to='/admin/feedback'>Feedback</Link>
              <Link to='/admin/teachers'>Teachers</Link>
              <Link to='/admin/sending_letters'>Sending letters</Link>
          </nav>
          <div className='routes'>
              <Switch>
                  <Route exact path='/admin' component={Home} />
                  <Route path='/admin/feedback' component={Feedback} />
                  <Route path='/admin/teachers' component={Teachers} />
                  <Route path='/admin/add_teacher' component={addTeacher} />
                  <Route path='/admin/teacher' component={Teacher} />
                  <Route path='/admin/sending_letters' component={SendingLetters} />
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
