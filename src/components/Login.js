import React, {Component} from 'react';

class Login extends Component {
  render(){
    return(
      <div>
      <br/>
      <div className = "home">
        <h3>Login</h3>
        <div className = "form">
          <form>
            Email:<input type="text"/>
            <br/>
            Password:<input type="text"/>
            <br/>
            <button>Log in</button>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default Login
