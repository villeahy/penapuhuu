import React from 'react';
import Post from './Post';
export default class PostList extends React.Component {
  render(){
    return(
      <div className='PostList'>
      {this.props.posts && this.props.posts.map((post, i) =><Post key={i} post={post} />)}
      </div>
    )
  }
}
