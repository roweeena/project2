import React, {Component} from 'react';
// import _ from 'underscore';
import _ from 'lodash';
import axios from 'axios';

// const itemListPromise = fetch(`https://maplestory.io/api/GMS/224/item/category/equip`)
//   .then(res => res.json());
//
// window.itemListPromise = itemListPromise;
// console.log(itemListPromise);



// const groupedHair = _.map(
//         _.groupBy(
//           itemListPromise.filter(item => item.id >= 30000 && item.id <= 60000),
//           item => Math.floor(item.id / 10)
//         ), itemGrouping => {
//           const firstItem = itemGrouping[0]
//           firstItem.similar = itemGrouping
//           return firstItem
//         }
//       )

// https://maplestory.io/api/GMS/224/item/1040007/icon

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

        const itemNumbers = _.mapValues(categories, function(category) {return category.id;});
        const numbersTest = _.mapValues(
            characterItems,
            item => item.id
        );
        this.itemRendering(categories, "Accessory", "Belt");
        // this.itemRendering(categories, this.state.selectedCategory, this.state.selectedSubcategory);
        // console.log("Item Numbers", itemNumbers);
        // console.log("Numbers Test", numbersTest);
      });


  }



    itemRendering (categories, chosenCategory, chosenSubcategory) {
      if (Object.keys(categories).length) {
        console.log("TEST");
        console.log(categories[chosenCategory][chosenSubcategory]);
        let itemsArray = categories[chosenCategory][chosenSubcategory].slice(0,100);
        console.log(itemsArray);

        let imageArray = itemsArray.map(item => {
          console.log(item.id);
          return <img src={this.characterURL(item.id)} />
        });
        return imageArray;
      }
    }



    urlGenerator (array) {
      let results = [];
      array.map(id => {
        results.push(`${ this.state }`);
      })
      console.log(results.join(","));
      return results.join(",");
    }

    characterURL (name) {
      return `https://maplestory.io/api/GMS/224/item/${name}/icon`;
    }


  //
  //
  //
  // fetchIcons(q) {
  //     const generateURL = function (p) {
  //       return [
  //         'https://maplestory.io/api/GMS/224/item/',
  //         p.itemId,
  //         '/icon'
  //       ].join('');
  //     };
  //
  //
  //
  //     // deferred: .done
  //     // promise: .then
  //     axios(flickrURL, { params: flickrParams }).then((response) => {
  //       // save images in state
  //       // this.setState({images: response.data.photos.photo});
  //       // .map the photo objects into their actual URLSs
  //       const images = _(response.data.photos.photo).map(generateURL);
  //       // save those URLs as the state
  //       this.setState({images: images});
  //     });
  //   }




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
