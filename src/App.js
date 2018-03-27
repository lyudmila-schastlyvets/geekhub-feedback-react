import React, { Component } from 'react'
import './App.css'
import { Route, Link, Switch } from 'react-router-dom'

import Home from './components/admin/home'
import Feedback from './components/admin/feedback'
import Teachers from './components/admin/teachersList'
import SendingLetters from './components/admin/sendingLetters'
import addTeacher from './components/admin/addTeacher'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Geekhub charity project</h1>
        </header>
          <nav>
              <Link to='/feedback'>Feedback</Link>
              <Link to='/teachers'>Teachers</Link>
              <Link to='/sending_letters'>Sending letters</Link>
          </nav>
          <div className='routes'>
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/feedback' component={Feedback} />
                  <Route path='/teachers' component={Teachers} />
                  <Route path='/add_teacher' component={addTeacher} />
                  <Route path='/sending_letters' component={SendingLetters} />
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
