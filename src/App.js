import React, { Component } from 'react'
import './App.css'
import { Route, Link, Switch } from 'react-router-dom'

import Home from './components/Home/Home'
import Feedback from './components/Feedback/Feedback'
import Teachers from './components/Teachers/Teachers'
import SendingLetters from './components/SendingLetters/SendingLetters'

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
              <Link to='/sending_letters'>SendingLetters</Link>
          </nav>
          <div className='routes'>
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/feedback' component={Feedback} />
                  <Route path='/teachers' component={Teachers} />
                  <Route path='/sending_letters' component={SendingLetters} />
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
