import React, {Component} from 'react';
import Post from './Post';
import NewPost from './NewPost';
import Navbar from './Navbar';
import {
	PrivateComponent,
	componentAuth,
	display_time_info
} from '../App';


class Home extends Component {

  constructor(props) {
		super(props);
		this.addPost = this.addPost.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.sortByTime = this.sortByTime.bind(this);
	}

	state = {
		posts: [],
		userId: -1
	}

	// fetch data before mounting component
	componentDidMount() {
		this.fetcher();
		this.setState({ userId: componentAuth.userId });
	}

	// grab posts from through express
	fetcher = () => {
		fetch('/posts')
			.then(res => res.json())
			.then(posts => this.setState({ posts }));
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
					"user_id": this.state.userId
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
			}, 3000);
		}
	}

	// delete button clicked on post
  deletePost = (e, postId) => {
		e.preventDefault();
    if (window.confirm("Are you sure you want to delete this post?") === true) {
			const req = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"postId": postId
				})
			};
      fetch('http://localhost:3001/deletePost', req)
			.then((res) => res.json())
			.then((data) => {
				if (data.msg === "OK")
					this.fetcher();
			});
    }      
  }


	// sort posts by time_created in order to render them in reverse chronological order
	sortByTime = (a, b) => {
		if (a.time_created > b.time_created)
			return -1;
		else
			return 1;
	}


  render() {
		const sortedPosts = this.state.posts.sort(this.sortByTime);
		// if redirected after logout, retrieve passed state
		const userId = this.props.location.state ? this.props.location.state.userId : this.state.userId;
    return (
      <div>
				<Navbar history={this.props.history} />
				<div className="home-posts">
					<PrivateComponent component={NewPost} addPost={this.addPost} />
					{sortedPosts.map((content, idx) => (
						<Post
							key={idx}
							id={idx}
							userId={userId}
							content={content}
							display_time_info={display_time_info}
							deletePost={this.deletePost}
						/>
					))}
				</div>
      </div>
    )
  }
}

export default Home;