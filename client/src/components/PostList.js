import React from 'react';

export default class PostList extends React.Component {
  render(){
    return(
      <div className='PostList'>
      {this.props.children}
      </div>
    )
  }
}
