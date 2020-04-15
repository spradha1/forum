import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom';
import {componentAuth} from '../App';
import '../styles/Signup.css';
import logo from '../assets/shagadelic.jpg';

class Signup extends Component {
  
  state = {
    signedUp: false
  }

  componentDidMount () {

  }

  // sign up
  signup = async () => {
    const email = document.querySelector('#signup-email').value;
    const pwd = document.querySelector('#signup-password').value;
    const confirmPwd = document.querySelector('#signup-confirm-password').value;
    const status = this.verifySignup(email, pwd, confirmPwd);
    if (status) {
      const req = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"email": email,
					"pwd": pwd
				})
			};
			await fetch('http://localhost:3001/addUser', req)
			.then((res) => res.json())
			.then((data) => {
				if (data.msg === "OK") {
          console.log('Signed up');
          componentAuth.signin();
          this.setState({ signedUp: componentAuth.isAuthenticated });
        }
      });
    }
    else {
      console.log('Failed to sign up');
      // empty input fields on failing sign up
      document.querySelector('#signup-email').value = "";
      document.querySelector('#signup-password').value = "";
      document.querySelector('#signup-confirm-password').value = "";
    }
  }

  // verfy signup information
  verifySignup = (email, pwd, confirmPwd) => {   
    if (this.verifyEmail(email) && this.verifyPassword(pwd, confirmPwd))
      return true;
    return false;
  }

  // verify email pattern
  verifyEmail = (email) => {
    const emailError = document.querySelector('.email-error');
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const matches = email.match(emailRegex);

    if (email.length !== 0 && matches) {
      emailError.innerHTML = "";
      return true;
    }
    else {
      emailError.innerHTML = "Enter a valid email address";
      return false;
    }
  }

  // verify password
  verifyPassword = (pwd, confirmPwd) => {
    const signupPasswordError = document.querySelector('.signup-password-error');
    const signupConfirmPasswordError = document.querySelector('.signup-confirm-password-error');
    signupPasswordError.innerHTML = "";
    signupConfirmPasswordError.innerHTML = "";
    if (pwd.length < 8) {
      signupPasswordError.innerHTML = "Password should be at least 8 characters long";
      return false;
    }
    if (pwd !== confirmPwd) {
      signupConfirmPasswordError.innerHTML = "Passwords don't match";
      return false;
    }
    signupPasswordError.innerHTML = "";
    signupConfirmPasswordError.innerHTML = "";
    return true;
  }


  render () {
    const { signedUp } = this.state;
    if (signedUp) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div className='signupPage'>
        <form
          className='signupBox'
          onSubmit={(e) => {
            e.preventDefault();
            this.signup();
          }} 
        >
          <div className='appEmblem appEmblem-center'>
            <img src={logo} alt='App Logo' />
            <span>ForReal?</span>
          </div>
          <div className='signup-email'>
            <label htmlFor="signup-email">Email*</label>
            <input type="text" id="signup-email" />
          </div>
          <span className="email-error"></span>
          <div className='signup-password'>
            <label htmlFor="signup-password">Password*</label>
            <input type="password" id="signup-password" />
          </div>
          <span className="signup-password-error"></span>
          <div className='signup-confirm-password'>
            <label htmlFor="signup-confirm-password">Confirm Password*</label>
            <input type="password" id="signup-confirm-password" />
          </div>
          <span className="signup-confirm-password-error"></span>
          <div className='signup-button'>
            <input type='submit' value='Sign up' />
          </div>
        </form>
      </div>
    )
  }
}

export default Signup;