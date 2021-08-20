import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
// import {Link} from 'react-router-dom';
import history from './history'

const SERVERURL = 'https://rpg-generator-backend.herokuapp.com';
// const SERVERURL = 'http://localhost:3001';

class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      character: []
     };

    // this._handleClick = this._handleClick.bind(this);
  }


componentDidMount() {
  const fetchCharacters = () => {
      console.log('fetching chars');
      axios.get(SERVERURL+`/users/40`, {withCredentials: true}).then((results) => {
        this.setState({ character: results.data.character });
        console.log("Results.data", results.data);
        console.log("This state from fetchCharacters", this.state.character);
      });
    };
    fetchCharacters();
}


// getCharacters() {
//   let someCharacters = [];
//   // axios.get(SERVERURL+`/users/${this.props.user.id}`, {withCredentials: true}).then(response => {
//   axios.get(SERVERURL+`/users/41`, {withCredentials: true}).then(response => {
//     console.log("Character Info", response.data);
//     someCharacters = response.data.character;
//     this.setState({character: response.data.character})
//
//     console.log("someCharacters", someCharacters);
//   });
// }



// {this.state.character.map((item)=> (<li  value={item} key={item}>{item} </li>))}

// loop through characters saved in account
  render(){
    return(
      <div className="home">
      Your account
        <div className="account">
          <p>Name: <small>{this.props.user && this.props.user.username}</small></p>

          <p>Email: <small> {this.props.user && this.props.user.email}</small></p>

          <CharacterResults character={this.state.character} click={this._handleClick} />

        </div>
      </div>
    )
  }
}

class CharacterResults extends Component {
  constructor() {
    super();
    this.state = { character: []};

    this._handleDelete = this._handleDelete.bind(this);

  }
  _handleDelete = (id) => {

    console.log("This is _handleDelete", id);
    axios.delete(SERVERURL+`/characters/${id}`);

  }

  render() {
    return(
      <div>
      <p>Saved characters:</p>
        {this.props.character.map(filteredCharacter => (
          <li key={ filteredCharacter.id } onClick={() => {this._handleClick(filteredCharacter.id)}}>

            Name:<button onClick={console.log("hi")}>
             {filteredCharacter.name}</button>,
              Class: {filteredCharacter.job},
            Catchphrase: {filteredCharacter.catchphrase}
            <button onClick={() => {this._handleDelete(filteredCharacter.id)}}> Delete Character</button>
            <br/>
          </li>
        ))}
      </div>
    );
  }



}

export default Account
