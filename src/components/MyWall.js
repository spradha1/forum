import React, {Component} from 'react';
import Post from './Post';
import Navbar from './Navbar';
import {Redirect} from 'react-router-dom';
import {
	componentAuth,
	display_time_info
} from '../App';


class MyWall extends Component {

  constructor(props) {
		super(props);
		this.sortByTime = this.sortByTime.bind(this);
	}

	state = {
		posts: []
	}

	// fetch data before mounting component
	componentDidMount() {
    this.fetcher();
	}

	// grab user's posts from through express
	fetcher = () => {
		fetch(`http://localhost:3001/myposts/?user_id=${componentAuth.userId}`)
			.then(res => res.json())
			.then(posts => this.setState({ posts }));
	}

	// sort posts by time_created in order to render them in reverse chronological order
	sortByTime = (a, b) => {
		if (a.time_created > b.time_created)
			return -1;
		else
			return 1;
	}


  render() {
		const sortedPosts = this.state.posts.sort(this.sortByTime);
    const userId = componentAuth.userId;

    // if not logged in, redirect to home page
    if (userId && userId !== -1) {
      return (
        <div>
          <Navbar history={this.props.history} />
          {sortedPosts.map((content, idx) => (
            <Post 
              key={idx}
              id={idx}
              userId={userId}
              content={content}
              display_time_info={display_time_info}	
            />
          ))}
        </div>
      )
    }
    else {
      return (
        <Redirect to='/' />
      )
    }
  }
}

export default MyWall;