import React, { Component } from 'react';
import {componentAuth} from '../App';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

class Navbar extends Component {

	state = {
    
  }

  componentDidMount () {

  }

  logout = () => {
    componentAuth.signout();
  }
  

  render () {
    return (
      <div className='nav-container'>
        {componentAuth.isAuthenticated &&
          <div className='log-button' onClick={this.logout}>
            <Link className='link' to={{
              pathname: `/`
            }}>
              LOG OUT
            </Link>
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
      </div>
    )
  }
}

export default Navbar;