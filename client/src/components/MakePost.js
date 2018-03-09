import React from 'react';

export default class MakePost extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      text:'',
      password:''
    };
    this.handlePost = this.handlePost.bind(this);
  }

  handlePost(){
    if(this.state.username===''){
      console.log('ei')
      this.setState({text:''})
    }else if(this.state.text===''){
      console.log('ei 2')
    }else if(this.state.password===''){
      this.props.forum.makePost({text:this.state.text, username:this.state.username, date: Date()})
      this.setState({username:'',
      text:''})
    }else{
      this.props.forum.makePost({text:this.state.text, username:this.state.username, date: Date() ,password: this.state.password})
      this.setState({username:'',
      text:'',
      password:''})
    }
  }

  render() {

    return (
      <div className='MakePost'>
      <label>Username:</label>
      <input value={this.state.username} onChange={(e) =>{
        this.setState({username: e.target.value})
      }}></input> <br />
      <label>Post:</label>
      <textarea value={this.state.text} onChange={(e) =>{
        this.setState({text: e.target.value})
      }}></textarea> <br />
      <label>Password:</label>
      <input value={this.state.password} onChange={(e) =>{
        this.setState({username: e.target.value})
      }} type='password'></input><br />
      <button onClick={this.handlePost}>Post</button>
      </div>
    );
  }
}
