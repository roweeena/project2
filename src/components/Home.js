import React, {Component} from 'react';
import history from './history';
import axios from 'axios';
import {Link} from 'react-router-dom';


class Home extends Component {

  render(){
    return(
        <div id="enter">
        <img src="https://i.pinimg.com/originals/ec/f9/c5/ecf9c521d2ca6970e9d13e25505fd95d.gif" height='100px' alt=""/>
        <Link to="/login">
        <button>
            Enter
          </button>
          </Link>
        </div>
    )
  }
}

export default Home
