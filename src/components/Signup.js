import React, {Component} from 'react';

class Signin extends Component {
  render(){
    return(
      <div>
      <br/>
      <div className = "home">
        <h3>Sign in</h3>
        <div className = "form">
          <form>
            Email:<input type="text"/>
            <br/>
            Password:<input type="text"/>
            <br/>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default Signin
