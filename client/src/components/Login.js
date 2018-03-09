import React from 'react'

export default class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }
  render(){
    return (
      <div className='Register'>
      <label>Username:</label>
      <input placeholder='BobDylan247' onChange={(e) =>{
        this.setState({username: e.target.value})
      }}></input><br />
      <label>Password:</label>
      <input type='password' placeholder='secret password' onChange={(e) =>{
        this.setState({password: e.target.value})
      }}></input><br />
      <button>Pena</button>
      </div>
    )
  }
}
