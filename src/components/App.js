import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Create from './Create'
import Home from './Home'
import './css/App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className ="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <Link to="/">Sign up</Link>
            </li>
            <li>
              <Link to="/">Login</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
        <h2>RPG Character Creator</h2>
        <Home />
        </div>
        <Switch>
          <Route path="/Create">
            <Create />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
