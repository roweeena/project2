import React, {Component} from 'react';
// import _ from 'underscore';
import _ from 'lodash';
import axios from 'axios';

class ItemListing extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      itemsList: {},
      categoryNames: [],
      subCategoryNames: [],
      selectedCategory: null,
      selectedSubcategory: null
    }
    // this.fetchIcon = this.fetchIcon.bind(this);
    this.itemRendering = this.itemRendering.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  componentDidMount(){
    let characterItems = {};
    axios.get('https://maplestory.io/api/GMS/224/item/category/equip')
      .then((response) => {
        characterItems = response.data;
        const itemsList = _.mapValues(
          _.groupBy(
            characterItems,
            item => item.typeInfo.category),
            items => _.groupBy(items, item => item.typeInfo.subCategory)
        );
        console.log(itemsList);
        this.getCategories(itemsList);
        this.setState({itemsList: itemsList});
        console.log("characterItems", characterItems);

        const itemNumbers = _.mapValues(itemsList, function(category) {return category.id;});
        const numbersTest = _.mapValues(
            characterItems,
            item => item.id
        );
        this.itemRendering(itemsList, "Accessory", "Belt");
        // this.itemRendering(itemsList, this.state.selectedCategory, this.state.selectedSubcategory);
        // console.log("Item Numbers", itemNumbers);
        // console.log("Numbers Test", numbersTest);
      });
  }

    itemRendering (itemsList, chosenCategory, chosenSubcategory) {
      if (Object.keys(itemsList).length) {
        console.log("TEST");
        console.log(itemsList[chosenCategory][chosenSubcategory]);
        let itemsArray = itemsList[chosenCategory][chosenSubcategory].slice(0,100);
        console.log(itemsArray);

        let imageArray = itemsArray.map(item => {
          // console.log(item.id);
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


getCategories(topItems) {
      let category = Object.keys(topItems); //gives back top-level categories
      console.log("Some categories",category);
      this.setState({categoryNames: category})
}

getSubCategories(s){
  let subCategory = Object.keys(s[this.state.selectedCategory])

  // let subCategory = Object.keys(category.map(item=> {
  //   console.log(Object.keys(categories[item])) //access categories' subCategories
  }


_handleChange(e){
  this.setState({selectedCategory: e.target.value});
}

  render() {

    return (
      <div className = "item-select">
        <aside>
          <h4>Make a selection:</h4>
            <select onChange={this._handleChange}>
              <option value=" "></option>
                {this.state.categoryNames.map((item)=> (<option  value={item}>{item} </option>))}
            </select>
            <select>
              <option value=" "> </option>

            </select>
          <div className="items-render">

            {this.itemRendering(this.state.itemsList, "Accessory", "Belt")}
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
