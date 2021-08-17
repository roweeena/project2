import React, {Component} from 'react';
import Enter from './Enter'

class Create extends Component {
  constructor(){
    super();
  this.state = {
    name: '',
    class: '',
    catchphrase:''
  }
}
//download/save to account function

  render(){
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
  }
}

export default Create
