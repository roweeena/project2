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
import Enter from './Enter'
import Finished from './Finished'
import Signup from './registrations/Signup'
import Login from './registrations/Login'
import Logout from './registrations/Logout'
import Account from './Account'

import history from './history';
import './css/App.css';

const SERVERURL = 'https://rpg-generator-backend.herokuapp.com';
// const SERVERURL = 'http://localhost:3001';

class App extends Component {
constructor(props){
  super(props);
  this.state = {
    isLoggedIn: false,
    user: {},
    name: '',
    class: '',
    catchphrase:'',
    imgUrl: '',
    character: ''
  };
}

  componentDidMount(){
   this.loginStatus()
  }

  getInfo = (data) => { //get name of character on enter page
   this.setState({name: data})
  }

   getImage = (data) => {
     this.setState({imgUrl: data})
   }

   getCharacter = (data) => {
     this.setState({character: data})
   }

   handleClick = () => { //logging out
   axios.delete(SERVERURL+'/logout', {withCredentials: true})
   .then(response => {
   this.handleLogout()
   this.history.push('/')
   })
   .catch(error => console.log(error))
   }

  loginStatus = () => {
    axios.get(SERVERURL+'/logged_in', {withCredentials: true})
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
    console.log(data);
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
    localStorage.removeItem('password')
    localStorage.removeItem('email')
  }

  render() {
    return (
      <div>
       <Router history={history}>
         <nav>
           <ul>
             <li>
              <Link to="/"> Home |</Link>
             </li>
             <li>
             {this.state.isLoggedIn ?
               <Link to="/create">Create |</Link> :
              null}

             </li>
             <li>
               {!this.state.isLoggedIn ?
                 <Link to="/signup">Sign up |</Link> :
                 null}
             </li>
             <li>
                {!this.state.isLoggedIn ? //shows if you aren't logged in
                 <Link to="/login">Log in</Link> :
                 null}
             </li>
             <li>
               {this.state.isLoggedIn ?  //shows if you are logged in
                 <Link to="/logout" onClick={this.handleClick}>Log Out</Link> :
                 null}
             </li>
           </ul>
         </nav>
      <div className = "title">
       <h2><Link to="/">RPG Character Creator</Link></h2>
      </div>
      <Switch>
        <Route exact path='/' render={props => (
          <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
          )}
        />
        {this.state.isLoggedIn &&
          <Route exact path="/enter" component={(props)=> <Enter {...props} getInfo={this.getInfo} user={this.state.user} getCharacter={this.getCharacter}/>} />
        }

        <Route path="/create">
          <Create name={this.state.name} isLoggedIn={this.state.isLoggedIn} getImage={this.getImage} character={this.state.character} />
        </Route>

        {this.state.isLoggedIn &&
      <Route path="/finished">
        <Finished get={this.state.itemId} imgUrl={this.state.imgUrl}/>
      </Route>
    }
        {this.state.isLoggedIn &&
          <Route path="/account" >
            <Account user={this.state.user} />
          </Route>
        }
        <Route
          exact path='/signup'
          render={props => (
          <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
          )}
        />
        <Route
           exact path='/login'
           render={props => (
           <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} getAccount={this.getAccount}/>
           )}
         />
        <Route path='/logout'>

          <Logout />
        </Route >
       </Switch>

      </Router>
      </div>
    );


  }
}

export default App;
