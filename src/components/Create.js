import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';
import ItemListing from './ItemListing'
import Finished from './Finished'

const SERVERURL = 'https://rpg-generator-backend.herokuapp.com';
// const SERVERURL = 'http://localhost:3001';

class Create extends Component {
  constructor(props){
    super(props);
  this.state = {
    isLoggedIn: false,
    name: '',
    class: '',
    catchphrase:'',
    itemId: [],
    img: ''
    }

    this.characterURL = this.characterURL.bind(this);
    this._handleClear = this._handleClear.bind(this);
    this._handleUndo = this._handleUndo.bind(this);
  }

  urlGenerator (array) {
    let results = [];
    array.map(id => {
      results.push(`{'itemId':${ id },'version':'224'}`);
    })
    // console.log(results.join(","));
    const characterImage = results.join(",")
    return characterImage;
  }

  characterURL (name ) {
    let url = `https://maplestory.io/api/character/${name}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=false&bgColor=0,0,0,0`
    // console.log('character render', url )
    return url;

  }

  _handleItemIds = (itemValue) => {
      const newItemId = [...this.state.itemId, itemValue]
      this.setState({itemId: newItemId});
      this.props.getImage(this.characterURL(this.urlGenerator(_.flatten([2000,12000,newItemId]))));
      // this.setState(this.characterURL(this.urlGenerator(_.flatten([2000,12000,newItemId]))));
      axios.put(SERVERURL+`/characters/${this.props.character.id}`,
        {image: this.characterURL(this.urlGenerator(_.flatten([2000,12000,newItemId])))});
      console.log("_handleItemIds", this.state.itemId);
  }

  _handleClear(e){
    this.setState({
      itemId: []
    })
  }


  _handleUndo(){
//console.log(this.state.itemId.length);

     const lastItem = this.state.itemId[this.state.itemId.length -1]
     console.log(lastItem);
    const filteredItems = this.state.itemId.filter(item => item !== lastItem)
    this.setState({
      itemId: filteredItems
    })
  }

  render(){
    if (this.props.isLoggedIn) {
      return(
        <div className="home">


          <div  id="create">
          <div>
            <h5>Name: {this.props.name}</h5>
            <p> Job: {this.props.character.job}</p>
            <p> Catchphrase: {this.props.character.catchphrase}</p>
            </div>
            <div className="studio">
              <img src={this.characterURL(this.urlGenerator(_.flatten([2000,12000,this.state.itemId])))} alt="character image" />
              </div>
              <ItemListing history={this.props.history} avatarItems={ this._handleItemIds } itemId={this.state.itemId} handleClear={this._handleClear} handleUndo={this._handleUndo} character={this.props.character}/>

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
