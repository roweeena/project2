import React, {Component} from 'react';
import axios from 'axios';



class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      name: '',
      email: '',
      password:'',
      confirm: '',
      errors: ''
    };
  }
  handleChange = (event) => {
    const{ name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  _handleSubmit(e){
    e.preventDefault();
    const {name, email, password, confirm} = this.state
    let user = {
      name: name,
      email: email,
      password: password,
      confirm: confirm
    }

    axios.post('http://localhost:3001/login', {user}, {withCredientials:true}).then(response =>{
      if(response.data.status === 'created'){
        this.props.handleLogin(response.data)
        this.redirect() //if successful redirec to home page
      }else{
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors= () => {
    return(
      <div>
        <ul>
        {this.state.errors.map(error => {
          return <li key={error}>{error}</li>
        })}
        </ul>
      </div>
    )
  }

  render(){
    return(
      <div>
      <br/>
      <div className = "home">
        <h3>Sign up</h3>
        <div className = "form">
          <form onSubmit={this.handleSubmit}>
            Name: <input type="text"
            onChange={this.handleChange}/>
            <br/>
            Email:<input type="text" onChange={this.handleChange}/>
            <br/>
            Password:<input type="password" onChange={this.handleChange}/>
            <br/>
            Confirm password: <input type="password" onChange={this.handleChange}/>
            <br/>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default Signup
