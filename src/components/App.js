import React, {Component} from "react";
import axios from 'axios';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Create from './Create'
import Home from './Home'
import Finished from './Finished'
import Signup from './Signup'
import Login from './Login'
import history from './history';
import './css/App.css';



class App extends Component {
constructor(props){
  super(props);
  this.state = {
    isLoggedIn: false,
    user: {}
  };
}

componenetDidMount(){
  this.loginStatus()
}

loginStatus=() =>{
  axios.get('http://localhost:3001/logged_in',{withCredientials: true}).then(response => {
    if(response.data.logged_in){
      this.handleLogin(response)
    }else {
      this.handleLogout()
    }
  })
  .catch(error => console.log('api errors:', error))
}

handleLogin = (data) => {
    console.log("execute handleLogin()");
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

handleLogout = () => {
  console.log("execute handleLogout()");
  this.setState({
    isLoggedIn: false,
    user: {}
  })
}

render(){
  return (
    <Router>
     <div>
     <nav>
       <ul>
         <li>
           <Link to="/">Home |</Link>
         </li>
         <li>
           <Link to="/create">Create |</Link>
         </li>
         <li>
           <Link to="/sign-up">Sign up |</Link>
         </li>
         <li>
           <Link to="/log-in">Log in</Link>
         </li>
        </ul>
       </nav>
       <div className = "title">
       <h2>RPG Character Creator</h2>
       </div>
       <Switch>
         <Route exact path="/">
           <Home />
         </Route>
         <Route path="/create">
           <Create />
         </Route>
         <Route path="/finished">
           <Finished />
         </Route>
        <Route exact path='/sign-up' component={(props) => <Signup {...props} handleLogin={this.handleLogin} /> } />
         <Route exact path='/log-in' component={(props) => <Login {...props} handleLogin={this.handleLogin}/> } />
       </Switch>
     </div>
   </Router>


    );
  }
}

export default App;
