import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Create from './Create'
import Home from './Home'
import Finished from './Finished'
import Signup from './Signup'
import Login from './Login'
import './css/App.css';

function App() {
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
         <Route path="/sign-up">
           <Signup />
         </Route>
         <Route path="/log-in">
           <Login />
         </Route>
       </Switch>
     </div>
   </Router>


  );
}

export default App;
