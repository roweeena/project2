import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state ={
//       email: '',
//       password: '',
//       errors: ''
//     };
//   }
//
//   handleChange = (event) => {
//     const{ name, value } = event.target
//     this.setState({
//       [name]: value
//     })
//   };
//
//   handleSubmit = (event) => {
//       event.preventDefault()
//       const { email, password } = this.state
//       let user = {
//         email: email,
//         password: password
//       }
//
//     axios.post('http://localhost:3001/login', {user},{ withCredientials:true })
//    .then(response =>{
//      console.log('fetching')
//       if(response.data.logged_in){
//         this.props.handleLogin(response.data.user)
//         this.redirect() //if successful redirect to create page
//       }else{
//         this.setState({
//           errors: response.data.errors
//         })
//       }
//     })
//     .catch(error => console.log('api errors:', error))
//   };
//
//   redirect(){
//     console.log('redirecting')
//     this.props.history.push('/create')
//   }
//
//   _handleErrors(){
//     return(
//       <div>
//         <ul>
//         {this.state.errors.map(error => {
//           return <li key={error}>{error}</li>
//         })}
//         </ul>
//       </div>
//     )
//   };
//
//   render(){
//     return(
//       <div>
//       <br/>
//       <div className = "home">
//         <h3>Login</h3>
//         <div className = "form">
//           <form onSubmit={this.handleSubmit}>
//             Email:<input type="text" onChange={this.handleChange}/>
//             <br/>
//             Password:<input type="password" onChange={this.handleChange}/>
//             <br/>
//             <button type="submit">Log in</button>
//             <div>
//             <p><small>Don't have an account? <Link to="/sign-up"> Sign up</Link></small></p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//       )
//   }
// }

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: ''
     };
  }
  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password} = this.state
let user = {
      username: username,
      email: email,
      password: password
    }

    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
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
    this.props.history.push('/')
  }
handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })
        }
        </ul>
      </div>
    )
  }
render() {
    const {username, email, password} = this.state
return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            or <Link to='/signup'>sign up</Link>
          </div>

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

export default Login
