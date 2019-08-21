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

    // add comment to its own state and then invoke the home component's function
    /*addCommentToThread (postId, commentInput) {
        if (commentInput) {
            const temp = Object.assign({}, this.state);
            temp.content.comments.push(commentInput);
            document.querySelector('#comment-area').value = '';
            this.setState(temp);
        }
        else {
			var alertBox = document.querySelector('.empty-comment-alert');
            alertBox.classList.toggle('empty-area');
            alertBox.innerHTML = "Comment cannot be empty";
			setTimeout(() => {
                alertBox.classList.toggle('empty-area');
                alertBox.innerHTML = "";
			}, 1000);
		}
    }*/

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
                <NewComment postId={this.props.match.params.postId} /*addComment={this.addCommentToThread}*/ />    
            </div>
        )
    }
}

export default Thread;