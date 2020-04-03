import React, { Component } from 'react';
import { 
	BrowserRouter as Router,
	Route 
} from 'react-router-dom';
import Home from './components/Home';
import Thread from './components/Thread';


// authentication object for components
const componentAuth = {
  isAuthenticated: true,
  signin(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

// authentication wrapper for component
const PrivateComponent = ({ component: Component, ...rest }) => (
  componentAuth.isAuthenticated === true && <Component {...rest} />
)


class App extends Component {

	constructor(props) {
		super(props);
	}

	state = {

	}
	

	render() {
		return (
			<Router>
				<div>
					<Route exact path='/' component={Home} />
					<Route path='/post/:postId' component={Thread} />
				</div>
			</Router>
		)
	}
}

export default App;
export {PrivateComponent, componentAuth};