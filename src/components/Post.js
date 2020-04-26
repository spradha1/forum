import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Post extends Component {

  state = {

  }
  
  componentDidMount () {

  }
	
  render () {
    return (
      <div className="post-box">
        <Link className='link' to={{ 
          pathname: `/post/${this.props.content.id}`,
          content: this.props.content
        }}>
          <div className="post-flex-box">
            {this.props.content.user_id === this.props.userId ?
              <div className="user_me">ME</div>
              :
              <div className="user_other">??</div>
            }
            <div className="text-content">
              {this.props.content.text}<br/>
              {this.props.display_time_info(this.props.content.time_created)}
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default Post;