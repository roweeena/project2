import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state ={
      email: '',
      password: '',
      errors: ''
    };
  }

  handleChange = (event) => {
    const{ name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
      event.preventDefault()
      const { email, password } = this.state
      let user = {
        email: email,
        password: password
      }

    axios.post('http://localhost:3001/login', {user},{ withCredientials:true })
   .then(response =>{
     console.log('fetching')
      if(response.data.logged_in){
        this.props.handleLogin(response.data.user)
        this.redirect() //if successful redirect to create page
      }else{
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  redirect(){
    console.log('redirecting')
    this.props.history.push('/create')
  }

  _handleErrors(){
    return(
      <div>
        <ul>
        {this.state.errors.map(error => {
          return <li key={error}>{error}</li>
        })}
        </ul>
      </div>
    )
  };

  render(){
    return(
      <div>
      <br/>
      <div className = "home">
        <h3>Login</h3>
        <div className = "form">
          <form onSubmit={this.handleSubmit}>
            Email:<input type="text" onChange={this.handleChange}/>
            <br/>
            Password:<input type="password" onChange={this.handleChange}/>
            <br/>
            <button type="submit">Log in</button>
            <div>
            <p><small>Don't have an account? <Link to="/sign-up"> Sign up</Link></small></p>
            </div>
          </form>
        </div>
      </div>
    </div>
      )
  }
}

export default Login
