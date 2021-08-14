import React, {Component} from 'react';
import history from './history';
class Home extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     name: '',
  //     class: '',
  //     catchphrase:''
  //   }
  //   this._handleSubmit = this._handleSubmit.bind(this)
  // }
  // _handleSubmit(e){
  //   e.preventDefault();
  //   this.props.history.push('/create');
  // }
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
            <button type="submit" onClick={() => history.push('/create')}>START</button>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default Home
