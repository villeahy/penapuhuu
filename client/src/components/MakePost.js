import React from 'react'
import PropTypes from 'prop-types'

export default class MakePost extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      text:'',
      password:''
    }
    this.handlePost = this.handlePost.bind(this)
    this.handlePostPrivate = this.handlePostPrivate.bind(this)
  }
  static contextTypes = {
    isPrivate: PropTypes.bool,
    forum: PropTypes.object.isRequired

  }

  handlePost(){
    const { forum } = this.context
    if(this.state.username===''){
      console.log('ei')
    }else if(this.state.text===''){
      console.log('ei 2')
    }else if(this.state.password===''){
      forum.makePost({text:this.state.text, username:this.state.username, date: Date()})
      this.setState({username:'',
      text:''})
    }else{
      forum.makePost({text:this.state.text, username:this.state.username, date: Date() ,password: this.state.password})
      this.setState({username:'',
      text:'',
      password:''})
    }
  }
  handlePostPrivate(){
    const { forum } = this.context
    if(this.state.text===''){
      console.log('ei')
    }else{
      forum.makePost({text:this.state.text, date: Date()})
      this.setState({text: ''})
    }
  }
  isPrivate(){
    const { isPrivate } = this.context
    if(isPrivate){
      return (<div className='MakePost'>
        <label>Post:</label>
        <textarea value={this.state.text} onChange={(e) =>{
          this.setState({text: e.target.value})
        }}></textarea> <br />
        <button onClick={this.handlePostPrivate}>Post</button>
        </div>
      )
    }else{
      return (<div className='MakePost'><label>Username:</label>
        <input value={this.state.username} onChange={(e) =>{
          this.setState({username: e.target.value}) }}></input> <br />
          <label>Post:</label>
          <textarea value={this.state.text} onChange={(e) =>{
            this.setState({text: e.target.value})
          }}></textarea> <br />
          <label>Password:</label>
          <input value={this.state.password} onChange={(e) =>{
            this.setState({password: e.target.value})
          }} type='password'></input>
          <br />
          <button onClick={this.handlePost}>Post</button>
        </div>)
    }
  }

  render() {
    return this.isPrivate()
  }
}
