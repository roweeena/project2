import React, {Component} from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Create from './Create'
import Home from './Home'
import Finished from './Finished'
import Signup from './registrations/Signup'
import Login from './registrations/Login'
import history from './history';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
     };
  }
  componentDidMount() {
      this.loginStatus()
  }

  handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      this.handleLogout()
      this.history.push('/')
    })
    .catch(error => console.log(error))
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }
  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

render() {
    return (
      <div>
        <Router>
          <nav>
            <ul>
              <li>
               <Link to="/">Home |</Link>
              </li>
              <li>
               <Link to="/create">Create |</Link>
              </li>
              <li>
                {
                  !this.state.isLoggedIn ?
                  <Link to="/signup">Sign up |</Link> :
                  null
                }
              </li>
              <li>
                {
                  !this.state.isLoggedIn ?
                  <Link to="/login">Log in</Link> :
                  null
                }
              </li>
              <li>
                {
                  this.state.isLoggedIn ?
                  <Link to="/logout" onClick={this.handleClick}>Log Out</Link> :
                  null
                }
              </li>


            </ul>
          </nav>
          <div className = "title">
            <h2>RPG Character Creator</h2>
          </div>


          <Switch>
            <Route
              exact path='/'
              render={props => (
              <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path='/login'
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path='/signup'
              render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route path="/create">
             <Create />
            </Route>
            <Route path="/finished">
             <Finished />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
