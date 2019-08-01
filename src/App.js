import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Thread from './components/Thread';

class App extends Component {

	// binding functions to be called from child components
	constructor (props) {
		super(props);
		this.addPost = this.addPost.bind(this);
		this.updateThread = this.updateThread.bind(this);
	}

	state = {
		posts: []
	}

	// adds the new post
	addPost = (postInput) => {
		if (postInput) {
			fetch('/addPost', {
				method: 'post',
			 	headers: {'Content-Type':'application/json'},
			 	body: {
					"text": postInput,
					"comments": []  
				}
			});
			document.querySelector('#post-area').value = '';
		}
		else {
			var alertBox = document.querySelector('.empty-post-alert');
			alertBox.classList.toggle('empty-area');
			setTimeout(() => {
				alertBox.classList.toggle('empty-area');
			}, 1000);
		}
	}

	// update post thread
	/*updateThread (postId, commentInput) {
		let temp = Object.assign({}, this.state);
		temp.posts[postId].comments.push(commentInput);
		document.querySelector('#comment-area').value = '';
		this.setState(temp);
	}*/

	// grab posts from express backend
	componentDidMount() {
		fetch('/posts')
		  .then(res => res.json())
		  .then(posts => this.setState({ posts }));
	}
	
  	render() {
    	return (
      		<div>
				<Route exact path='/' render={() => <Home posts={this.state.posts} addPost={this.addPost} />} />
				<Route path='/post/:postId' component={Thread} />
      		</div>
    	)
  	}
}

export default App;