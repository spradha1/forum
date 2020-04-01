import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {

  state = {
      
	}
	
  render () {
    return (
      <div className="panel post-bounds">
        <Link className='link' to={{ 
          pathname: `/post/${this.props.content.id}`,
          content: this.props.content
        }}>
          <div>
						{this.props.content.text}
					</div> 
        </Link>
      </div>
    )
  }
}

export default Post;