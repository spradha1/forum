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
  login = async () => {
    if (await this.verifyLogin()) {
      componentAuth.signin();
      this.setState({ loggedIn: componentAuth.isAuthenticated });
    }
    else {
      var alertBox = document.querySelector('.login-failed-alert');
			alertBox.innerHTML = "Email/password is incorrect";
      alertBox.classList.toggle('empty-area');
      document.querySelector('#email').value = '';
      document.querySelector('#password').value = '';
			setTimeout(() => {
				alertBox.classList.toggle('empty-area');
				alertBox.innerHTML = "";
			}, 3000);
    }
  }

  // verify login credentials
  verifyLogin = () => {
    // search users by email and password
    const email = document.querySelector('#email').value;
    const pwd = document.querySelector('#password').value;
		return fetch(`http://localhost:3001/user/?email=${email}&pwd=${pwd}`)
			.then(res => res.json())
			.then(users => {
        if (users.length === 1)
          return true;
        else
          return false;
      });
  }

  render () {
    const { loggedIn } = this.state;
    // return to page from where login was attempted
    const { from } = this.props.location.state || { from: { pathname: '/'} }
    if (loggedIn) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className='loginPage'>
        <div className='loginBox'>
          <div className='email'>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" />
          </div>
          <div className='password'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className='login-button' onClick={this.login}>
            Login
          </div>
          <div className='login-failed-alert'></div>
        </div>
      </div>
    )
  }
}

export default Login;