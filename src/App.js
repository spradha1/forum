import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Thread from './components/Thread';

class App extends Component {

	constructor(props) {
		super(props);
		this.addPost = this.addPost.bind(this);
		this.sortByTime = this.sortByTime.bind(this);
	}

	state = {
		posts: []
	}

	// fetch data before mounting app
	componentDidMount() {
		this.fetcher();
	}

	// grab posts from through express
	fetcher = () => {
		fetch('/posts')
			.then(res => res.json())
			.then(posts => this.setState({ posts }));
	}

	// sort posts by time_created in order to render them in reverse chronological order
	sortByTime = (a, b) => {
		if (a.time_created > b.time_created)
			return -1;
		else
			return 1;
	}


	// adds the new post
	addPost = (postInput) => {
		if (postInput) {
			const req = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"text": postInput,
					"comments": []
				})
			};
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
	

	render() {
		return (
			<div>
				<Route exact path='/' render={() => <Home 
					posts={this.state.posts.sort(this.sortByTime)} 
					addPost={this.addPost}
				/>} />
				<Route path='/post/:postId' component={Thread} />
			</div>
		)
	}
}

export default App;