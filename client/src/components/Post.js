import React from 'react'

import forum from '../utils/forum'

export default class Post extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      password: ''
    }
    this.handlePassword = this.handlePassword.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  getClock(date){
    if(date.getMinutes()<9){
      if(date.getHours()<9){
        return '0'+date.getHours()+':0'+date.getMinutes()
      }else{
        return date.getHours()+':0'+date.getMinutes()
      }
    }else{
      if(date.getHours()<9){
        return '0'+date.getHours()+':'+date.getMinutes()
      }else{
        return date.getHours()+':'+date.getMinutes()
      }
    }
  }
  renderDay(){
    const date = new Date(this.props.post.date)
    return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+ '  '+this.getClock(date)
  }
  handlePassword(e){
    this.setState({password: e.target.value})
  }
  handleClick(){
    if(this.state.password!==''){
      forum.deletePost(this.state.password,this.props.post.id)
      this.setState({password:''})
    }

  }
  renderDelete(){
    if(this.props.post.hasRemove){
      return <div className='Delete'><input value={this.state.password} onChange={this.handlePassword} placeholder='Password' type='password'></input>
      <button onClick={this.handleClick}>X</button></div>
    }else{
      return null
    }
  }
  render(){
    return(
      <div className='Post'>
      <h4>User {this.props.post.username}</h4>
      {this.renderDelete()}
      <p>{this.props.post.text}</p>
      <p>Posted: {this.renderDay()}</p>
      </div>
    )
  }
}
