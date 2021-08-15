import React, {Component} from 'react';
import axios from 'axios';



class Signin extends Component {
  constructor(){
    super();
    this.state={
      name: '',
      email: '',
      password:'',
      confirm: '',
      error_msg: []
    };
  }

  _handleSubmit(e){
    e.preventDefault();
  }

  render(){
    return(
      <div>
      <br/>
      <div className = "home">
        <h3>Sign up</h3>
        <div className = "form">
          <form>
            Name: <input type="text"/>
            <br/>
            Email:<input type="text"/>
            <br/>
            Password:<input type="text"/>
            <br/>
            Confirm password: <input type="text"/>
            <br/>
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default Signin
