import React from 'react';

export default class PostList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }
  }

componentWillMount(){
  this.props.getPosts()
}

  render(){
    const { isPrivate } = this.props
    if(isPrivate && this.state.loggedIn){
      return null;

    }else{
      return(
        <div className='PostList'>
        {this.props.children}
        </div>
      )
    }

  }
}
