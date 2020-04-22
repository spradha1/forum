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
	userId: -1,
  signin(id) {
		this.isAuthenticated = true;
		this.userId = id;
  },
  signout() {
		this.isAuthenticated = false;
		this.userId = -1;
	}
}

// authentication wrapper for component
const PrivateComponent = ({ component: Component, ...rest }) => (
  componentAuth.isAuthenticated && <Component {...rest} />
)


class App extends Component {

	constructor(props) {
		super(props);
		// retrieve logged in user id in case of page refresh
		if (window.performance) {
			if (performance.navigation.type === 1) {
				const savedAuth = window.localStorage.getItem('componentAuth');
				if (savedAuth) {
				  try {
						const parsedAuth = JSON.parse(savedAuth);
						if (parsedAuth.userId !== -1)
							componentAuth.signin(parsedAuth.userId);
					}
					catch (e) {
						console.log("Invalid JSON");
				  }
				}
			}
		}
	}

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