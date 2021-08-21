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
    this._handleShare = this._handleShare.bind(this);
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
  _handleShare(){
    this.props.history.push('/finished');

  }

  render(){
    if (this.props.isLoggedIn) {
      return(
        <div>
        <h5> {this.props.name}</h5>
          <div className="home" id="create">
            <div className="studio">
            <img src={this.characterURL(this.urlGenerator(_.flatten([2000,12000,this.state.itemId])))} alt="character image" />
            </div>
            <ItemListing history={this.props.history} avatarItems={ this._handleItemIds } itemId={this.state.itemId} handleClear={this._handleClear} character={this.props.character}/>

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
