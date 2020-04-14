import React, { Component } from 'react';
import { 
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import Home from './components/Home';
import Thread from './components/Thread';
import Login from './components/Login';
import Signup from './components/Signup';
import './styles/Home.css';


// authentication object for components
const componentAuth = {
  isAuthenticated: false,
  signin() {
		this.isAuthenticated = true;
  },
  signout() {
		this.isAuthenticated = false;
	}
}

// authentication wrapper for component
const PrivateComponent = ({ component: Component, ...rest }) => (
  componentAuth.isAuthenticated && <Component {...rest} />
)


class App extends Component {

	state = {

	}
	

	render() {
		return (
			<Router>
				<div className="appBody">
					<Route exact path='/' component={Home} />
					<Route path='/post/:postId' component={Thread} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
				</div>
			</Router>
		)
	}
}

export default App;
export {PrivateComponent, componentAuth};