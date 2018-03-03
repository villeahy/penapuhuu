import React, { Component } from 'react';

import MakePost from './components/MakePost';
import PostList from './components/PostList';

import forum from './utils/forum';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      posts:[]
    }
  }
  componentWillMount(){
    forum.getPosts().then(posts =>this.setState({posts}))
  }
  render() {
    return (
      <div className="App">
      <h1>Pena Puhuu</h1>
      <PostList posts={this.state.posts} />
      <MakePost />
      </div>
    );
  }
}

export default App;
