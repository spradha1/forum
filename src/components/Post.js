import React, { Component } from 'react';

class Post extends Component {

    state = {
        
    }

    render () {
        return (
            <div className="panel post-bounds">
                {this.props.content}
            </div>
        )
    }
}

export default Post;