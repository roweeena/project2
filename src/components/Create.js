import React, {Component} from 'react';


class Create extends Component {

  render(){
    return(
      <div>
      <div className="home" id="create">
      <aside>
      <h4>Make a selection:</h4>
      <select>
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
      </aside>
      <div className="studio">
      </div>
      </div>
      </div>
    )
  }
}

export default Create
