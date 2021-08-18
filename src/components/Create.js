import React, {Component} from 'react';
import Enter from './Enter'
import ItemListing from './ItemListing'

class Create extends Component {
  constructor(){
    super();
  this.state = {
    name: '',
    class: '',
    catchphrase:'',
    itemId: []
    }

    this.characterURL = this.characterURL.bind(this);

    const allItems = [{'itemId':2000,'version':'224'},{'itemId':12000,'version':'224'}];
    // const characterURL = `https://maplestory.io/api/character/${this.urlGenerator([2000,12000])}/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=false&bgColor=0,0,0,0`;
    // console.log(characterURL);
    // console.log(...allItems);
    // this.urlGenerator([2000,12000]);
  }
//download/save to account function
  //
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

  // fetchImages(q) {
  // const generateURL = function (p) {
  //   return [
  //     'https://maplestory.io/api/character/',
  //     p.farm,
  //     '.static.flickr.com/',
  //   ].join('');
  // };

// items url https://maplestory.io/api/GMS/224/item/category/equip

  render(){
    return(
      <div>

        <div className="home" id="create">
          <div className="test">
            <h5> {this.props.name}</h5>
          </div>

          <div className="studio">

          <img src={this.characterURL(this.urlGenerator([2000,12000,1040007,1092009]))} />
          </div>
          <ItemListing />

        </div>
      </div>
    )
  }
}

export default Create
