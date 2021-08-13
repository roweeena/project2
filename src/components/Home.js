import React, {Component} from 'react';

class Home extends Component {
  render(){
    return(
      <div>
      <br/>
      <div className = "home">
        <div className = "form">
          <h3>Welcome!</h3>
          <p><small>Type in your character name, class and a catchprase! </small></p>
          <form>
            Name:<input type="text"/>
            <br/>
            Class:<input type="text"/>
            <br/>
            Catchphrase:<input type="text"/>
            <br/>
            <p><small>Select your gender.</small></p>
            <img src="https://via.placeholder.com/150" alt="placeholder"/>
            <img src="https://via.placeholder.com/150" alt="placeholder"/>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default Home
