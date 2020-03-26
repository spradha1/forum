import React, {Component} from 'react';
import '../styles/Home.css';

class NewComment extends Component {

    constructor (props) {
        super(props);
        this.state.commentInput = '';
        this.addComment = this.addComment.bind(this);
    }

    state = {
        commentInput: ''
    }

    // add comment to post thread
	addComment = (postId, cmnt)  => {
        console.log("hi");
        // const size = this.state.posts.length;
        // let newComment = this.state.posts[size-postId-1].comments;
        // newComment.push(cmnt);
        // const req = {
        // 	method: 'PUT',
        // 	headers: {
        // 		'Content-Type': 'application/json',
        // 	},
        // 	body: JSON.stringify({
        // 		"text": this.state.posts[postId],
        // 		"comments": newComment
        // 	})
        // };

        this.setState({
            commentInput: ''
        });
    }

    // track changes in comment input
	updateCommentInput = (content) => {
		this.setState({commentInput: content.trim()});
    }


    render () {
        return (
            <div className='comment-panel comment-bounds'>
				<textarea
                    id = 'comment-area'
					placeholder='What do ya think about this?'
					onChange={(e) => this.updateCommentInput(e.target.value)} />
          		<div className='post-button' onClick={(e) => {
                    e.persist();
                    let tgt = e.target.nextSibling;
                    if (this.state.commentInput !== "") {
                        this.addComment(this.props.postId, this.state.commentInput);
                        tgt.innerHTML = "";
                    }
                    else {
                        tgt.classList.toggle('empty-area');
                        tgt.innerHTML = "Comment cannot be empty";
                        setTimeout(() => {
                            tgt.classList.toggle('empty-area');
                            tgt.innerHTML = "";
                        }, 1000);
                    }        
                }}>Post</div>
				<div className='empty-comment-alert'></div>
        	</div>
        )
    }
}

export default NewComment;