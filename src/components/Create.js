import React, {Component} from 'react';
import _ from 'lodash';
import ItemListing from './ItemListing'
import Finished from './Finished'


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
  }

  urlGenerator (array) {
    let results = [];
    array.map(id => {
      results.push(`{'itemId':${ id },'version':'224'}`);
    })
    console.log(results.join(","));
    const characterImage = results.join(",")
    return characterImage;
  }

  characterURL (name, url) {

    return `https://maplestory.io/api/character/${name}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=false&bgColor=0,0,0,0`;
    this.setState({img: url  })
  }

  _handleItemIds = (itemValue) => {
      this.setState({itemId: [...this.state.itemId, itemValue]});
      console.log("_handleItemIds", this.state.itemId);
    }

    _handleClear(e){
      this.setState({
        itemId: []
      })
    }


  render(){
    if (this.props.isLoggedIn) {
      return(
        <div>
          <div className="home" id="create">
            <h5> {this.props.name}</h5>

            <div className="studio">
            <img src={this.characterURL(this.urlGenerator(_.flatten([2000,12000,this.state.itemId])))} alt="character image" />
            </div>
            <ItemListing avatarItems={ this._handleItemIds } itemId={this.state.itemId} handleClear={this._handleClear}/>

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
