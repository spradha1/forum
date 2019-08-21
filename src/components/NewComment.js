import React, {Component} from 'react';
import '../styles/Home.css';

class NewComment extends Component {

    constructor (props) {
        super(props);
        this.state.commentInput = '';
    }

    state = {
        commentInput: ''
    }

    // track changes in comment input
	updateCommentInput = (content) => {
		this.setState({commentInput: content.trim()});
    }
    
    // new comment
    createComment = () => {
        // this.props.addComment(this.props.postId, this.state.commentInput);
        this.setState({
            commentInput: ''
        });
    }

    render () {
        return (
            <div className='comment-panel comment-bounds'>
				<textarea
                    id = 'comment-area'
					placeholder='What do ya think about this?'
					onChange={(e) => this.updateCommentInput(e.target.value)} />
          		<div className='post-button' onClick={this.createComment}>Post</div>
				<div className='empty-comment-alert'></div>
        	</div>
        )
    }
}

export default NewComment;