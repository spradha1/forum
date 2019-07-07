import React, {Component} from 'react';
import Post from './Post';
import NewPost from './NewPost';

class Home extends Component {
    state = {
    	posts: [
      		'first post'
		]
	}
	
	// add the new post
	addPost = (postInput) => {
		if (postInput) {
			const temp = Object.assign({}, this.state);
			temp.posts.unshift(postInput);
			document.querySelector('textarea').value = '';
			this.setState(temp);
		}
		else {
			var alertBox = document.querySelector('.empty-post-alert');
			alertBox.classList.toggle('empty-post');
			setTimeout(() => {
				alertBox.classList.toggle('empty-post');
			}, 1000);
		}
	}

  	render() {
    	return (
      		<div>
				<NewPost addPost={this.addPost} />
				{this.state.posts.map((content, idx) => (
          			<Post key={idx} content={content} />
				))}
      		</div>
    	)
  	}
}

export default Home;