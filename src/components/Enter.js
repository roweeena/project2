import React, {Component} from 'react';
import axios from 'axios';
import history from './history'

const SERVERURL = 'https://rpg-generator-backend.herokuapp.com';
// const SERVERURL = 'http://localhost:3001';

class Enter extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      name: '',
      job: '',
      catchphrase:''
    }
    this._handleSubmit = this._handleSubmit.bind(this);
    this._renderName = this._renderName.bind(this);
    this._renderClass = this._renderClass.bind(this);
    this._renderCatchphrase = this._renderCatchphrase.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  getInfo = (data) => {
    this.setState({name: data})
  }

  componentDidMount(){
    this.getInfo()
  }
  _renderName(e){
    this.setState({name: e.target.value});
  }
  _renderClass(e){
    this.setState({job: e.target.value});
  }
  _renderCatchphrase(e){
    this.setState({catchphrase: e.target.value});
  }


  _handleSubmit(e){
    e.preventDefault();
    this.props.getInfo(this.state.name); //
    console.log("this.props.getInfo(this.state.name)");
    this.setState({name: '', catchphrase: '', job: ''});
    this.props.history.push('/create');



    axios.post(SERVERURL+'/characters', {name: this.state.name,
    catchphrase: this.state.catchphrase, job: this.state.job, user_id: this.props.user.id}, {withCredentials: true}).then(response => {
      if (response.data.character) {
        this.props.getCharacter(response.data.character)
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    });
  };


  render(){

    return(
      <div>
      <br/>
      <div className = "enter">
        <div className = "form">
          <h3>Welcome!</h3>
          <p><small>Type in your character name, class and a catchphrase! </small></p>
          <form onSubmit={this._handleSubmit}>
            Name:<input type="text" onChange={this._renderName} value={this.state.name} required={true}/>
            <br/>
            Class: <select onChange={this._renderClass} value={this.state.job}>
            <option value="Choose an option"></option>
            <option value="Magician">Magician</option>
            <option value="Thief">Thief</option>
            <option value="Warrior">Warrior</option>
            <option value="Bowman">Bowman</option>
            <option value="Pirate">Pirate</option>
            </select>
            <br/>
            Catchphrase:<input type="text" onChange={this._renderCatchphrase} value={this.state.catchphrase}/>
            <br/>
            <button type="submit" >START</button>
          </form>
        </div>
      </div>
    </div>

    )
  }
}

export default Enter
