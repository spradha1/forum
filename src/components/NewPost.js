import React, {Component} from 'react';
import '../styles/NewPost.css';

class NewPost extends Component {
    state = {
        postInput: ''
    }

    // track changes in post input
	updatePostInput = (content) => {
		this.setState({postInput: content.trim()});
    }
    
    // new post
    createPost = () => {
        this.props.addPost(this.state.postInput);
        this.setState({
            postInput: ''
        })
    }

    render () {
        return (
            <div className='panel post-bounds'>
				<textarea
					placeholder='Ask a question'
					onChange={(e) => this.updatePostInput(e.target.value)} />
          		<div className='post-button' onClick={this.createPost}>Post</div>
				<div className='empty-post-alert'>Post cannot be empty</div>
        	</div>
        )
    }
}

export default NewPost;