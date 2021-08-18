import React, {Component} from 'react';
import history from './history'
import Enter from './Enter'

class Create extends Component {
  constructor(props){
    super(props);
  this.state = {
    isLoggedIn: false,
    name: '',
    class: '',
    catchphrase:''
  }
}
//download/save to account function

  render(){
    if (this.props.isLoggedIn){
    return(
      <div>
      <div className="home" id="create">
        <div className="test">
      <h5> {this.props.name}</h5>
      </div>
        <div className="studio">

        </div>
        <div className = "item-select">
          <aside>
            <h4>Make a selection:</h4>
              <select>
                <option value=" "></option>
                <option value="character">Character</option>
                <option value="accessory">Accessory</option>
                <option value="armour">Armor</option>
                <option value="mount">Mount</option>
                <option value="weapon">Weapon</option>
              </select>
              <select>
                <option value=" "> (blank)</option>
              </select>
            <div className="items-render">
              <p>Coming soon</p>
            </div>
            <div className="studioButtons">
              <button> Save </button>
              <button> Clear </button>
            </div>
          </aside>
        </div>

        </div>
      </div>
    )
  } else {
    return(
      <div>
      <h3>You don't have access to this page. Please log in or sign up to start creating your character.</h3>
      </div>
    )
  }
  }
}

export default Create
