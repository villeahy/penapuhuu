import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MakePost from './components/MakePost'
import PostList from './components/PostList'
import Post from './components/Post'
import Register from './components/Register'
import Login from './components/Login'

import forum from './utils/forum'
import privateForum from './utils/privateForum'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      posts:[],
      privateposts:[],
      logged: false
    }
    this.setPublic = this.setPublic.bind(this)
    this.setPrivate = this.setPrivate.bind(this)
    this.setLogged = this.setLogged.bind(this)
  }
  static childContextTypes = {
    isPrivate: PropTypes.bool,
    forum: PropTypes.object.isRequired,
    setLogged: PropTypes.func.isRequired,
    privateForum: PropTypes.object.isRequired
  }
  getChildContext() {
    return {
      isPrivate: false,
      forum: forum,
      setLogged: this.setLogged,
      privateForum: privateForum
    }
  }
  setLogged(value){
    this.setState({logged: value})
  }
  setPublic(posts){
    this.setState({posts})
  }
  setPrivate(privateposts){
    this.setState({privateposts})
  }
  renderPrivate(){
    if(this.state.logged){
      return(<PostList isPrivate forum={privateForum} setPosts={this.setPrivate} posts={this.state.privateposts}>
      <div className='PostList'>
        <h3>Private</h3>
        {this.state.privateposts && this.state.privateposts.map((post, i) =><Post key={i} post={post} />)}
        <MakePost />
      </div>
      </PostList>)
    }else{
      return(
        <div className='PostList'>
        <Login />
        <Register />
        </div>)
    }
  }
  render() {
    return (
      <div className="App">
      <h1>Pena Puhuu</h1>

      <PostList forum={forum} setPosts={this.setPublic} posts={this.state.posts} >
      <div className='PostList'>
        <h3>Public</h3>
        {this.state.posts && this.state.posts.map((post, i) =><Post key={i} post={post} />)}
        <MakePost />
        </div>
      </PostList>
      {this.renderPrivate()}

      </div>
    )
  }
}

export default App
