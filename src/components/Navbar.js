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

  goToHome = () => {
    this.props.history.push({
      pathname: '/'
    });
  }
  

  render () {
    return (
      <div className='nav-container'>
        {componentAuth.isAuthenticated &&
          <div className='nav-option' onClick={this.logout}>
            LOG OUT
          </div>
        }
        {!componentAuth.isAuthenticated &&
          <div className='nav-option'>
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
        {componentAuth.isAuthenticated &&
          <div className='nav-option'>
            <Link className='link' to={{
              pathname: `/mywall`,
            }}>
              MY WALL
            </Link>
          </div>
        }
        {!componentAuth.isAuthenticated &&
          <div className='nav-option'>
            <Link className='link' to={{
              pathname: `/signup`,
            }}>
              SIGN UP
            </Link>
          </div>
        }
        <div className='nav-option'>
          <Link className='link' to={{
            pathname: `/`,
          }}>
            HOME
          </Link>
        </div>
        <div className='appEmblem appEmblem-left'>
          <img src={logo} alt='App Logo' onClick={this.goToHome} />
          <span>ForReal?</span>
        </div>
      </div>
    )
  }
}

export default Navbar;