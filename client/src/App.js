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
    this.deletePost = this.deletePost.bind(this);
  }
  componentWillMount(){
    forum.getPosts().then(posts =>{
      const reverse =posts.reverse();
      this.setState({posts: reverse})
    })
  }
  componentDidMount(){
    pusher.setPusher('add', this.newPost)
    pusher.setPusher('delete', this.deletePost)
  }
  newPost(post){
    const posts = this.state.posts.reverse();
    posts.push(JSON.parse(post.post));
    this.setState({posts:posts.reverse()});
  }
  deletePost(post){
    let posts = this.state.posts;
    const remove =JSON.parse(post.post);
    remove.forEach(post =>{
      posts=posts.filter(filter=>filter.id!==post._id);
    })
    this.setState({posts})
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
