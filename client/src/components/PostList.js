import React from 'react'
import PropTypes from 'prop-types'

import pusher from '../utils/pusher'


export default class PostList extends React.Component {
  constructor(props){
    super(props)
    this.newPost = this.newPost.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }
  static childContextTypes = {
    isPrivate: PropTypes.bool,
    forum: PropTypes.object.isRequired
  }
  getChildContext() {
    return {
      isPrivate: this.props.isPrivate,
      forum: this.props.forum
    }
  }

  componentWillMount(){
    const { forum } = this.props
    forum.getPosts().then(posts =>{
      this.props.setPosts(posts.reverse())
    })
  }
  componentDidMount(){
    const { isPrivate } = this.props
    pusher.setPusher(isPrivate ? 'private-add' : 'add' , this.newPost)
    pusher.setPusher(isPrivate ? 'private-delete' : 'delete' , this.deletePost)
  }
  newPost(post){
    const posts = this.props.posts.reverse()
    posts.push(JSON.parse(post.post))
    this.props.setPosts(posts.reverse())
  }
  deletePost(post){
    let posts = this.props.posts
    const remove =JSON.parse(post.post)
    remove.forEach(post =>{
      posts=posts.filter(filter=>filter.id!==post._id)
    })
    this.props.setPosts(posts)
  }
  render(){
      return this.props.children
    }
  }
