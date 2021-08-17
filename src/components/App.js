import React, {Component} from "react";
import axios from 'axios';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home'
import Create from './Create'
import Enter from './Enter'
import Finished from './Finished'
import Signup from './Signup'
import Login from './Login'
import Account from './Account'

import history from './history';
import './css/App.css';



class App extends Component {
constructor(props){
  super(props);
  this.state = {
    isLoggedIn: false,
    user: {},
    name: '',
    class: '',
    catchphrase:''
  };
}

componenetDidMount(){
  this.loginStatus()
}

getInfo = (data)=>{
  this.setState({name: data})
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
    <Router history={history}>
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
       <h2><Link to="/">RPG Character Creator</Link></h2>
       </div>
       <Switch>
        <Route exact path="/" component={Home} />
         <Route exact path="/enter" component={(props)=> <Enter {...props} getInfo={this.getInfo}/>} />
         <Route path="/create">
           <Create name={this.state.name} />
         </Route>
         <Route path="/finished">
           <Finished />
         </Route>
         <Route path="/sign-up">
            <Signup />
          </Route>
          <Route path="/log-in">
            <Login />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
        </Switch>
     </div>
   </Router>


    );
  }
}

export default App;
