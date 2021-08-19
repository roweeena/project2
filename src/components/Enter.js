import React, {Component} from 'react';

class Enter extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      class: '',
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
    this.setState({class: e.target.value});
  }
  _renderCatchphrase(e){
    this.setState({catchphrase: e.target.value});
  }


  _handleSubmit(e){
    e.preventDefault();
    this.props.getInfo(this.state.name); //
    console.log("this.props.getInfo(this.state.name)");
    this.setState({name: '', catchprase: '', class: ''})
    this.props.history.push('/create');
  }


  render(){
    return(
      <div>
      <br/>
      <div className = "enter">
        <div className = "form">
          <h3>Welcome!</h3>
          <p><small>Type in your character name, class and a catchprase! </small></p>
          <form onSubmit={this._handleSubmit}>
            Name:<input type="text" onChange={this._renderName} value={this.state.name} required={true}/>
            <br/>
            Class: <select onChange={this._renderClass} value={this.state.class}>
            <option value="Choose an option"></option>
            <option value="magician">Magician</option>
            <option value="thief">Thief</option>
            <option value="warrior">Warrior</option>
            <option value="bowman">Bowman</option>
            <option value="pirate">Pirate</option>
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
