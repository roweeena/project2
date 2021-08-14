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
            <button>START</button>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default Home
