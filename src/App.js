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

// displays time of creation or duration of how long ago it as created
const display_time_info = (time) => {
	var timeInfo = '';
	const current_time = new Date();
	const post_time = new Date(Date.parse(time));
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const post_time_year = post_time.getFullYear();
	const post_time_month = months[post_time.getMonth()];
	const post_time_date = post_time.getDate();
	const post_time_hours = post_time.getHours() < 10 ? '0' + post_time.getHours(): post_time.getHours();
	const post_time_minutes = post_time.getMinutes() < 10 ? '0' + post_time.getMinutes(): post_time.getMinutes();
	const post_time_clock = post_time_hours + ':' + post_time_minutes;

	const diffDays = Math.abs(current_time - post_time)/(1000*60*60*24);
	if (diffDays >= 1)
		timeInfo = post_time_month + ' ' + post_time_date + ', ' + post_time_year + ' at ' + post_time_clock;
	else {
		const diffHours = Math.abs(current_time - post_time)/(1000*60*60);
		if (diffHours >= 1)
			timeInfo = Math.floor(diffHours) + 'h ago';
		else {
			const diffMinutes = Math.abs(current_time - post_time)/(1000*60);
			timeInfo = Math.floor(diffMinutes) + 'm ago';
		}
	}
	return timeInfo;
}


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
					<Route exact path='/' component={Home} display_time_info={this.display_time_info} />
					<Route path='/post/:postId' component={Thread} display_time_info={this.display_time_info} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
				</div>
			</Router>
		)
	}
}

export default App;
export {PrivateComponent, componentAuth, display_time_info};