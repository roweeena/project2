import React, {Component} from 'react';
import _ from 'lodash';
import history from './history'
import Enter from './Enter'
import ItemListing from './ItemListing'

class Create extends Component {
  constructor(props){
    super(props);
  this.state = {
    isLoggedIn: false,
    name: '',
    class: '',
    catchphrase:'',
    itemId: []
    }

    this.characterURL = this.characterURL.bind(this);

    const allItems = [{'itemId':2000,'version':'224'},{'itemId':12000,'version':'224'}];

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

  _handleItemIds = (itemValue) => {
      this.setState({itemId: [...this.state.itemId, itemValue]});
      console.log("_handleItemIds", this.state.itemId);
    }

  render(){
    if (this.props.isLoggedIn) {
      return(
        <div>
          <div className="home" id="create">
            <div className="test">
          <h5> {this.props.name}</h5>
          </div>
            <div className="studio">

            <img src={this.characterURL(this.urlGenerator(_.flatten([2000,12000,this.state.itemId])))} />
            </div>
            <ItemListing avatarItems={ this._handleItemIds }/>

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
