import React, { Component } from 'react'

import MakePost from './components/MakePost'
import PostList from './components/PostList'
import Post from './components/Post'
import Register from './components/Register'

import forum from './utils/forum'
import pusher from './utils/pusher'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      posts:[]
    }
    this.newPost = this.newPost.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.getPublic = this.getPublic.bind(this)
  }
  getPublic(){
    forum.getPosts().then(posts =>{
      const reverse =posts.reverse()
      this.setState({posts: reverse})
    })
  }
  componentDidMount(){
    pusher.setPusher('add', this.newPost)
    pusher.setPusher('delete', this.deletePost)
  }
  newPost(post){
    const posts = this.state.posts.reverse()
    posts.push(JSON.parse(post.post))
    this.setState({posts:posts.reverse()})
  }
  deletePost(post){
    let posts = this.state.posts
    const remove =JSON.parse(post.post)
    remove.forEach(post =>{
      posts=posts.filter(filter=>filter.id!==post._id)
    })
    this.setState({posts})
  }
  render() {
    return (
      <div className="App">
      <h1>Pena Puhuu</h1>
      <Register />
      <PostList getPosts={this.getPublic}>
        <h3>Public</h3>
        {this.state.posts && this.state.posts.map((post, i) =><Post key={i} post={post} />)}
        <MakePost forum={forum} />
      </PostList>
      <PostList isPrivate getPosts={this.getPublic}>
        <h3>Private</h3>
        {this.state.posts && this.state.posts.map((post, i) =><Post key={i} post={post} />)}
        <MakePost forum={forum} />
      </PostList>
      </div>
    )
  }
}

export default App
