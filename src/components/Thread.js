import React, {Component} from 'react';
import NewComment from './NewComment';
import Navbar from './Navbar';
import {PrivateComponent} from '../App';

class Thread extends Component {
  
	constructor (props) {
		super(props);
		this.addComment = this.addComment.bind(this);
		this.sortByTime = this.sortByTime.bind(this);
  }
    
  state = {
		postId: '',
		post: {},
    comments: []
  }

	// fetch data before mounting app
	componentDidMount() {
		this.fetcher();
	}

	// grab data synchronously through express
	fetcher = async () => {
		const postId = this.props.match.params.postId;
		await this.fetchPost(postId);
		await this.fetchComments(postId);
		this.setState({ postId });
	}

	// fetch post data
	fetchPost = (postId) => {
		fetch(`http://localhost:3001/post/?postId=${postId}`)
			.then(res => res.json())
			.then(post => this.setState({ post: post[0] }));
	}
	
	// fetch comments for the post
	fetchComments = (postId) => {
		fetch(`http://localhost:3001/comments/?postId=${postId}`)
			.then(res => res.json())
			.then(comments => this.setState({ comments }));
	}

	// adds the new comment to the desired post
	addComment = (postId, commentInput) => {
		if (commentInput) {
			const req = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"feed_id": postId,
					"text": commentInput
				})
			};
			fetch(`http://localhost:3001/addComment`, req)
			.then((res) => res.json())
			.then((data) => {
				if (data.msg === "OK")
					this.fetcher();
			});
			document.querySelector('#comment-area').value = '';
		}
		else {
			var alertBox = document.querySelector('.empty-comment-alert');
			alertBox.innerHTML = "Comment cannot be empty";
			alertBox.classList.toggle('empty-area');
			setTimeout(() => {
				alertBox.classList.toggle('empty-area');
				alertBox.innerHTML = "";
			}, 3000);
		}
	}

	// sort comments by time_created in order to render them in chronological order
	sortByTime = (a, b) => {
		if (a.time_created > b.time_created)
			return 1;
		else
			return -1;
	}

  render () {
		const sortedComments = this.state.comments.sort(this.sortByTime);
    return (
      <div>
				<Navbar />
        <div className="panel post-bounds">
          {this.state.post.text}
        </div>
        <p className="post-bounds">Comments: {this.state.comments.length}</p>
				<PrivateComponent
					component={NewComment}
					postId={this.props.match.params.postId}
					addComment={this.addComment}
				/> 
        {sortedComments.map((comment, idx) => (
          <div key={idx} className='comment-panel comment-bounds'>{comment.text}</div>
        ))}
      </div>
    )
  }
}

export default Thread;