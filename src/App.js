import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Thread from './components/Thread';

class App extends Component {
	state = {

	}

  	render() {
    	return (
      		<div>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/post/:name' component={Thread}/>
				</Switch>
      		</div>
    	)
  	}
}

export default App;