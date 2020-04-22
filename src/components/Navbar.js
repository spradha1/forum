import React, { Component } from 'react';
import {componentAuth} from '../App';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/shagadelic.jpg';

class Navbar extends Component {

	state = {
    
  }

  componentDidMount () {

  }

  logout = async () => {
    await componentAuth.signout();
    window.localStorage.clear();
    this.props.history.push({
      pathname: '/',
      state: { userId: componentAuth.userId }
    });
  }
  

  render () {
    return (
      <div className='nav-container'>
        {componentAuth.isAuthenticated &&
          <div className='log-button' onClick={this.logout}>
            LOG OUT
          </div>
        }
        {!componentAuth.isAuthenticated &&
          <div className='log-button'>
            <Link className='link' to={{
              pathname: `/login`,
              state: {
                from: window.location.pathname
              }
            }}>
              LOG IN
            </Link>
          </div>
        }
        {!componentAuth.isAuthenticated &&
          <div className='log-button'>
            <Link className='link' to={{
              pathname: `/signup`,
            }}>
              SIGN UP
            </Link>
          </div>
        }
        <div className='appEmblem appEmblem-left'>
          <img src={logo} alt='App Logo' />
          <span>ForReal?</span>
        </div>
      </div>
    )
  }
}

export default Navbar;