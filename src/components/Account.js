import React, {Component} from 'react';


class Account extends Component {

// loop through characters saved in account
  render(){
    return(
      <div className="home">
      Your account
      <div className="account">
        <p>Name:</p>

        <p>Email:</p>

        <p>Saved characters:</p>
          <small>Name, class, image</small>

      </div>
      </div>
    )
  }
}

export default Account
