import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, Link, Switch } from 'react-router-dom'

import Home from './components/Home'
import Feedback from './components/Feedback'
import Teachers from './components/TeachersList'
import SendingLetters from './components/SendingLetters'
import Login from './components/Login'
import Logout from './components/Logout'
import Comments from './components/Comments'
import FormTeacher from './components/FormTeacher'
import Teacher from './components/Teacher'

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
            <Link to='/admin/feedback'>Feedback</Link>
            <Link to='/admin/teachers'>Teachers</Link>
            <Link to='/admin/sending_letters'>SendingLetters</Link>
            {this.state.loggedIn !== 'true'? '' : <Logout loggedIn={this.state.loggedIn} />}
          </nav>
          <div className='routes'>
            <Switch>
              <Route exact path='/admin' component={Home} />
              <Route path='/admin/feedback' component={Feedback} />
              <Route path='/admin/teachers' component={Teachers} />
              <Route path='/admin/form_teacher' component={FormTeacher} />
              <Route path='/admin/teacher/:id' render={(props) => <Teacher {...props} />} />
              <Route path='/admin/sending_letters' component={SendingLetters} />
              <Route path='/admin/login' component={Login} loggedIn={this.state.loggedIn}/>
              <Route path='/comment' component={Comments}/>
            </Switch>
          </div>
      </div>
    );
  }
}

export default App;
