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
      selectedCategory: '',
      selectedSubcategory: ''
    }
    // this.fetchIcon = this.fetchIcon.bind(this);
    this.itemRendering = this.itemRendering.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getSubCategories = this.getSubCategories.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleSubChange = this._handleSubChange.bind(this);
    this._handleClear = this._handleClear.bind(this);
    this.setAvatarItems = this.setAvatarItems.bind(this);
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
        // console.log(itemsList);
        this.getCategories(itemsList);
        this.setState({itemsList: itemsList});
        // console.log("characterItems", characterItems);

        const itemNumbers = _.mapValues(itemsList, function(category) {return category.id;});
        const numbersTest = _.mapValues(
            characterItems,
            item => item.id
        );
        // this.itemRendering(itemsList, "Accessory", "Belt");
        // this.itemRendering(itemsList, this.state.selectedCategory, this.state.selectedSubcategory);
        // console.log("Item Numbers", itemNumbers);
        // console.log("Numbers Test", numbersTest);
      });
  }

  itemRendering (itemsList, chosenCategory, chosenSubcategory) {
    if (Object.keys(itemsList).length) {
      // console.log("TEST");
      // console.log(itemsList[chosenCategory][chosenSubcategory]);
      let itemsArray = itemsList[chosenCategory][chosenSubcategory].slice(0,100);
      // console.log(itemsArray);

      let imageArray = itemsArray.map(item => {
        // console.log(item.id);
        return <a href=""><img src={this.characterURL(item.id)} key={this.characterURL(item.id)} onClick={(event) => {
          this.setAvatarItems(event, item.id);
        }} /> </a>
        // return <button><img src={this.characterURL(item.id)} alt="alt text" key={this.characterURL(item.id)} onClick={this.setAvatarItems} /> </button>
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

  setAvatarItems(event,itemId) {
    event.preventDefault();
    console.log("HEY FROM setAvatarItems", event, itemId);
    // this.props.onClick(itemId);
    this.setState({items: itemId});
    this.props.avatarItems(itemId);

  }


  getSubCategories(s){
    console.log('s',s);
    console.log("subcategory ItemsList", this.state.itemsList);
    this.setState({subCategoryNames: Object.keys(this.state.itemsList[s]) });
    console.log("getSubCategories", Object.keys(this.state.itemsList[s]));
  }

  _handleSubChange(e){
    this.setState({selectedSubcategory: e.target.value});
    console.log("_handleSubChange");
  }

  _handleSubChange(e){
    this.setState({selectedSubcategory: e.target.value});
    console.log("_handleSubChange");
  }
  _handleSave(){
    console.log('save')
  }
  _handleClear(e){
    this.setState({selectedCategory: '',
    selectedSubcategory: '',
    subCategoryNames:[]})
    console.log('clear')
  }

    // let subCategory = Object.keys(this.itemsList[this.state.selectedCategory])
  //   //   console.log("subCategory", subCategory)
  //    let subCategory = Object.keys(itemsList.map(item=> {
  //    console.log(Object.keys(itemsList[item])) //access categories' subCategories
  //  })
  // )

  render() {

    return (
      <div className = "item-select">
        <aside>
          <h4>Make a selection:</h4>
            <select onChange={this._handleChange}>
              <option selected="true" disabled="disabled"> </option>
                {this.state.categoryNames.map((item)=> (<option  value={item} key={item}>{item} </option>))}
            </select>
            <select onChange={this._handleSubChange} >
              <option selected="true" disabled="disabled"></option>
                {this.state.subCategoryNames.map((item)=> (<option  value={item} key={item}>{item} </option>))}
            </select>
          <div className="items-render">
            {this.state.selectedCategory && this.state.selectedSubcategory ?
            this.itemRendering(this.state.itemsList, this.state.selectedCategory, this.state.selectedSubcategory) : null}

          </div>
          <div className="studioButtons">
            <button onClick={this._handleSave}> Save </button>
            <button onClick={this._handleClear}> Clear </button>
          </div>
        </aside>
      </div>
    );
  }

}


export default ItemListing;
