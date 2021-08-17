import React, {Component} from 'react';
import _ from 'lodash';

const itemListPromise = fetch(`https://maplestory.io/api/GMS/224/item/category/equip`)
  .then(res => res.json());

window.itemListPromise = itemListPromise
console.log(itemListPromise);

class ItemListing extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      categories: {},
      categoryNames: {},
      selectedCategory: null
    }
  }

urlGenerator (array) {
  let results = [];
  array.map(id => {
    results.push(`{'itemId':${ id },'version':'224'}`);
  })
  console.log(results.join(","));
  return results.join(",");
}

characterURL (name) {
  return `https://maplestory.io/api/character/${name}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=false&bgColor=0,0,0,0`;
}  

render() {
  return (
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
  );
}






}

export default ItemListing;
