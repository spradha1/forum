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
    comments: []
  }

	// fetch data before mounting app
	componentDidMount() {
		this.fetcher();
	}

	// grab comments through express
	fetcher = () => {
		const postId = this.props.location.content.id;
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
          {this.props.location.content.text}
        </div>
        <p className="post-bounds">Comments: {this.state.comments.length}</p>
        {sortedComments.map((comment, idx) => (
          <div key={idx} className='comment-panel comment-bounds'>{comment.text}</div>
        ))}
        <NewComment postId={this.props.match.params.postId} /> 
      </div>
    )
  }
}

export default Thread;