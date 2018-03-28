import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, Link, Switch } from 'react-router-dom'

import Home from './components/Home/Home'
import Feedback from './components/Feedback/Feedback'
import Teachers from './components/Teachers/Teachers'
import SendingLetters from './components/SendingLetters'
import Login from './components/Login'
import Logout from './components/Logout'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('loggedIn')
    }

    this.localStorageFunc = this.localStorageFunc.bind(this);
  }

  localStorageFunc () {
    if (!localStorage.getItem('loggedIn'))
      localStorage.setItem('loggedIn', 'false')
  }

  render() {
    this.localStorageFunc();
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Geekhub charity project</h1>
        </header>
          <nav>
            <Link to='/feedback'>Feedback</Link>
            <Link to='/teachers'>Teachers</Link>
            <Link to='/sending_letters'>SendingLetters</Link>
            {this.state.loggedIn !== 'true'? '' : <Logout loggedIn={this.state.loggedIn} />}
          </nav>
          <div className='routes'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/feedback' component={Feedback} />
              <Route path='/teachers' component={Teachers} />
              <Route path='/sending_letters' component={SendingLetters} />
              <Route path='/login' component={Login} loggedIn={this.state.loggedIn}/>
            </Switch>
          </div>
      </div>
    );
  }
}

export default App;
