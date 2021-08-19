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
        return <a href="" key={item.id}><img src={this.characterURL(item.id)} key={this.characterURL(item.id)}alt="Maplestory item" onClick={(event) => {
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

  getCategories(topItems) {
        let category = Object.keys(topItems); //gives back top-level categories
        console.log("Some categories",category);
        this.setState({categoryNames: category});
        this.setState({selectedCategory: category[0]});
        this.getSubCategories(category[0], topItems);
  }


  getSubCategories(s, topItems=this.state.itemsList){ //default
    console.log('s',s);
    console.log("subcategory ItemsList", topItems);
    let itemCategory = Object.keys(topItems[s])
    this.setState({subCategoryNames: itemCategory, selectedSubcategory: itemCategory[0] });
    console.log("getSubCategories", Object.keys(topItems[s]));
    return Object.keys(topItems[s]);
  }

  _handleChange(e){
    console.log("items list", this.state.itemsList);
    this.setState({selectedSubcategory: ""})
    this.setState({selectedCategory: e.target.value}, () => {
      let subCategory = this.getSubCategories(this.state.selectedCategory);
      this.setState({selectedSubcategory: subCategory[0] });
      console.log('is this null',this.state.selectedCategory);
    });
  }
  _handleSubChange(e){
    this.setState({selectedSubcategory: e.target.value});
    console.log("_handleSubChange");
  }

  _handleSave(){
    console.log('save')
  }
  

  render() {

    return (
      <div className = "item-select">
        <aside>
          <h4>Make a selection:</h4>
            <select onChange={this._handleChange} value={this.state.selectedCategory}>
                {this.state.categoryNames.map((item, index)=> (<option value={item} defaultValue={index === 0 ? true : false} key={item}>{item} </option>))}
            </select>
            <select onChange={this._handleSubChange} value={this.state.selectedSubcategory}>
                {this.state.subCategoryNames.map((item)=> (<option value={item} key={item}>{item} </option>))}
            </select>
          <div className="items-render">
            {this.state.selectedCategory && this.state.selectedSubcategory ?
            this.itemRendering(this.state.itemsList, this.state.selectedCategory, this.state.selectedSubcategory) : null}

          </div>
          <div className="studioButtons">
            <button onClick={this._handleSave}> Save </button>

          </div>
        </aside>
      </div>
    );
  }

}


export default ItemListing;
