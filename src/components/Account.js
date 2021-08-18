import React, {Component} from 'react';
import Signup from './registrations/Signup'
import Login from './registrations/Login'


class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
     };
  }

// loop through characters saved in account
  render(){
    return(
      <div className="home">
      Your account
      <div className="account">
        <p>Name: <small>{this.props.user && this.props.user.username}</small></p>

        <p>Email: <small> {this.props.user && this.props.user.email}</small></p>

        <p>Saved characters:</p>
          <div>
          </div>
      </div>
      </div>
    )
  }
}

export default Account
