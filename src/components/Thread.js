import React, {Component} from 'react';
import NewComment from './NewComment';
import Navbar from './Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from 'react-router-dom';
import {
	PrivateComponent,
	componentAuth,
	display_time_info
} from '../App';

class Thread extends Component {
  
	constructor (props) {
		super(props);
		this.deletePost = this.deletePost.bind(this);
		this.addComment = this.addComment.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
		this.sortByTime = this.sortByTime.bind(this);
  }
    
  state = {
		postId: '',
		post: {},
		comments: [],
		userId: -1,
		deleted: false
  }

	// fetch data before mounting app
	componentDidMount() {
		this.fetcher();
		this.setState({ userId: componentAuth.userId});
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

	// delete post
	deletePost = (postId) => {
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
					this.setState({ deleted: true });
			});
    } 
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
					"text": commentInput,
					"user_id": this.state.userId
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

	// delete comment
	deleteComment = (commentId) => {
		if (window.confirm("Are you sure you want to delete this comment?") === true) {
			const req = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"commentId": commentId
				})
			};
      fetch('http://localhost:3001/deleteComment', req)
			.then((res) => res.json())
			.then((data) => {
				if (data.msg === "OK")
					this.fetchComments(this.state.postId);
			});
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
		const { deleted } = this.state;
    if (deleted) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div>
				<Navbar history={this.props.history} />
        <div className="post-box">
					<div className="post-flex-box">
            {this.state.post.user_id === this.state.userId ?
              <div className="user_me">ME</div>
              :
              <div className="user_other">??</div>
            }
            <div className="text-content">
							{this.state.post.text}<br/>
							<span className="time_info">{display_time_info(this.state.post.time_created)}</span>
            </div>
						{this.state.post.user_id === this.state.userId &&
              <div className="delete-button">
                <FontAwesomeIcon icon={faTimesCircle} onClick={() => this.deletePost(this.state.postId)}/>
              </div>
            }
          </div>
        </div>
        <p className="post-info-box">Comments: {this.state.comments.length}</p>
				<PrivateComponent
					component={NewComment}
					postId={this.props.match.params.postId}
					addComment={this.addComment}
				/> 
        {sortedComments.map((comment, idx) => (
					<div key={idx} className='comment-box'>
						<div className="comment-flex-box">
            	{comment.user_id === this.state.userId ?
              	<div className="user_me">ME</div>
              	:
              	<div className="user_other">??</div>
            	}
            	<div className="text-content">
								{comment.text}<br/>
								<span className="time_info">{display_time_info(comment.time_created)}</span>
            	</div>
							{comment.user_id === this.state.userId &&
              	<div className="delete-button">
                	<FontAwesomeIcon icon={faTimesCircle} onClick={() => this.deleteComment(comment.id)}/>
              	</div>
            	}
						</div>
					</div>
        ))}
      </div>
    )
  }
}

export default Thread;