import React from 'react';
import forum from '../utils/forum';

export default class MakePost extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      text:'',
      password:''
    };
    this.handleUser = this.handleUser.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleUser(e){
    this.setState({username: e.target.value})
  }
  handleText(e){
    this.setState({text: e.target.value})
  }
  handlePass(e){
    this.setState({password: e.target.value})
  }
  handlePost(){
    if(this.state.username===''){
      console.log('ei')
      this.setState({text:''})
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

  render() {
    return (
      <div className='MakePost'>
      <p>Username:</p>
      <input value={this.state.username} onChange={this.handleUser}></input> <br />
      <p>Post:</p>
      <textarea value={this.state.text} onChange={this.handleText} rows='4' cols='55'></textarea> <br />
      <p>Password:</p>
      <input value={this.state.password} onChange={this.handlePass} type='password'></input>
      <button onClick={this.handlePost}>Post</button>
      </div>
    );
  }
}
