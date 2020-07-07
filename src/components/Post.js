import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";


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
              <span className="time_info">{this.props.display_time_info(this.props.content.time_created)}</span>
            </div>
            {this.props.content.user_id === this.props.userId &&
              <div className="delete-button">
                <FontAwesomeIcon icon={faTimesCircle} onClick={(e) => this.props.deletePost(e, this.props.content.id)}/>
              </div>
            }
          </div>
        </Link>
      </div>
    )
  }
}

export default Post;