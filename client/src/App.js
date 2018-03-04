import React, { Component } from 'react';

import MakePost from './components/MakePost';
import PostList from './components/PostList';

import forum from './utils/forum';
import pusher from './utils/pusher';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      posts:[]
    }
    this.newPost = this.newPost.bind(this);
  }
  componentWillMount(){
    forum.getPosts().then(posts =>{
      const reverse =posts.reverse();
      this.setState({posts: reverse})
    })
  }
  componentDidMount(){
    pusher.setPusher('forum', this.newPost)
  }
  newPost(post){
    const posts = this.state.posts.reverse();
    posts.push(JSON.parse(post.post));
    this.setState({posts:posts.reverse()});
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
