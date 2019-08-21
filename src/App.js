import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Thread from './components/Thread';

class App extends Component {

	// binding functions to be called from child components
	constructor(props) {
		super(props);
		this.addPost = this.addPost.bind(this);
		// this.updateThread = this.updateThread.bind(this);
	}

	state = {
		posts: []
	}

	// fetch data before mounting app
	componentDidMount() {
		this.fetcher();
	}

	// grab posts from express backend
	fetcher = () => {
		fetch('/posts')
			.then(res => res.json())
			.then(posts => this.setState({ posts }));
	}


	// adds the new post
	addPost = (postInput) => {
		const req = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"text": postInput,
				"comments": [],
			})
		};
		if (postInput) {
			fetch('http://localhost:3001/addPost', req)
			.then((res) => res.json())
			.then((data) => {
				if (data.msg === "OK")
					this.fetcher();
			});
			document.querySelector('#post-area').value = '';
		}
		else {
			var alertBox = document.querySelector('.empty-post-alert');
			alertBox.innerHTML = "Post cannot be empty";
			alertBox.classList.toggle('empty-area');
			setTimeout(() => {
				alertBox.classList.toggle('empty-area');
				alertBox.innerHTML = "";
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
	

	render() {
		return (
			<div>
				<Route exact path='/' render={() => <Home posts={this.state.posts.reverse()} addPost={this.addPost} />} />
				<Route path='/post/:postId' component={Thread} />
			</div>
		)
	}
}

export default App;