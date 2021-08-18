import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';


class ItemListing extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      categories: {},
      categoryNames: {},
      selectedCategory: null
    }
    // this.fetchIcon = this.fetchIcon.bind(this);
    this.itemRendering = this.itemRendering.bind(this);
  }

  componentDidMount(){

    const fetchItemList = () => {
      let characterItems = {};
      axios.get('https://maplestory.io/api/GMS/224/item/category/equip')
        .then((response) => {
          characterItems = response.data;
          const categories = _.mapValues(
            _.groupBy(
              characterItems,
              item => item.typeInfo.category),
              items => _.groupBy(items, item => item.typeInfo.subCategory)
          );
          console.log("categories", categories);
          this.setState({categories: categories});
          console.log("characterItems", characterItems);

          this.itemRendering(categories, "Accessory", "Belt");
        });
    };
    fetchItemList();
  };



  itemRendering (categories, chosenCategory, chosenSubcategory) {
    if (Object.keys(categories).length) {
      console.log("TEST");
      console.log("categories[chosenCategory][chosenSubcategory]", categories[chosenCategory][chosenSubcategory]);
      console.log("TEST2", Object.keys(categories));
      console.log("TEST2", Object.keys(categories["Accessory"]));
      let itemsArray = categories[chosenCategory][chosenSubcategory].slice(0,100);
      console.log(itemsArray);

      let imageArray = itemsArray.map(item => {
        // console.log(item.id);
        return <img src={this.characterURL(item.id)} />
      });
      return imageArray;
    }
  };



  urlGenerator (array) {
    let results = [];
    array.map(id => {
      results.push(`${ this.state }`);
    })
    console.log(results.join(","));
    return results.join(",");
  };

  characterURL (name) {
    return `https://maplestory.io/api/GMS/224/item/${name}/icon`;
  };


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
            {this.itemRendering(this.state.categories, "Accessory", "Belt")}
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
