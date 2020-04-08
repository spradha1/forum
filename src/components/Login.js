import React, { Component } from 'react';
import {componentAuth} from '../App';
import {
  Redirect
} from 'react-router-dom';
import '../styles/Login.css';

class Login extends Component {
  
  state = {
    loggedIn: false
  }

  componentDidMount () {
    this.setState({ loggedIn: componentAuth.isAuthenticated });
  }

  // login
  login = () => {
    // TODO: validate login credentials
    componentAuth.signin();
    this.setState({ loggedIn: componentAuth.isAuthenticated });
  }

  render () {
    const { loggedIn } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/'} }
    if (loggedIn) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className='loginPage'>
        <div className='loginBox'>
          <div className='username'>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className='password'>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" />
          </div>
          <div className='login-button' onClick={this.login}>
            LOG IN
          </div>
        </div>
      </div>
    )
  }
}

export default Login;