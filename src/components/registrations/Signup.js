import React, {Component} from 'react';
import axios from 'axios';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
     };
  }


  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password, password_confirmation} = this.state
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
    axios.post('https://rpg-generator-backend.herokuapp.com/users', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/enter')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul>
      </div>
    )
  }

  render() {
    const {username, email, password, password_confirmation} = this.state
    return (
      <div className = "home">
        <h3>Sign Up</h3>
        <form onSubmit={this.handleSubmit}>
          Name: <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <br/>
          Email:<input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <br/>
          Password:<input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <br/>
          Confirm password:<input
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />
          <br/>
          <button placeholder="submit" type="submit">
            Sign Up
          </button>

        </form>
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}


export default Signup
