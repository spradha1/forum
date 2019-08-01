import React, {Component} from 'react';
import Post from './Post';
import NewPost from './NewPost';

class Home extends Component {

  state = {
		
	}

  render() {
    return (
      <div>
				<NewPost addPost={this.props.addPost} />
				{this.props.posts.map((content, idx) => (
					<Post key={idx} id={idx} content={content} />
				))}
      </div>
    )
  }
}

export default Home;