import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

class Post extends Component {

    state = {
        
    }

    render () {
        return (
            <Link className='link' to={{ 
                pathname: `/post/${this.props.id}`,
                content: this.props.content
            }}>
                <div className="panel post-bounds">
                    {this.props.content.text} 
                </div>
            </Link>
        )
    }
}

export default Post;