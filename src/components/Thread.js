import React, {Component} from 'react';
import NewComment from './NewComment';

class Thread extends Component {
    // binding functions to be called from child components
	/*constructor (props) {
		super(props);
		this.addCommentToThread = this.addCommentToThread.bind(this);
    }*/
    
    state = {
        /*content: {
            body: this.props.location.content.body,
            comments: this.props.location.content.comments
        }*/
    }


    render () {
        return (
            <div>
                <div className="panel post-bounds">
                    {this.props.location.content.text}
                </div>
                <p className="post-bounds">Comments: {this.props.location.content.comments.length}</p>
                {this.props.location.content.comments.map((comment, idx) => (
                    <div key={idx} className='comment-panel comment-bounds'>{comment}</div>
                ))}
                <NewComment postId={this.props.match.params.postId} />    
            </div>
        )
    }
}

export default Thread;