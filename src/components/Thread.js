import React, {Component} from 'react';
import NewComment from './NewComment';

class Thread extends Component {
  
	constructor (props) {
		super(props);
		this.sortByTime = this.sortByTime.bind(this);
  }
    
  state = {
    /*content: {
      body: this.props.location.content.body,
      comments: this.props.location.content.comments
		}*/
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
        <div className="panel post-bounds">
          {this.state.post.text}
        </div>
        <p className="post-bounds">Comments: {this.state.comments.length}</p>
				<NewComment postId={this.props.match.params.postId} /> 
        {sortedComments.map((comment, idx) => (
          <div key={idx} className='comment-panel comment-bounds'>{comment.text}</div>
        ))}
      </div>
    )
  }
}

export default Thread;