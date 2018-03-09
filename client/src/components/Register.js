import React from 'react'

export default class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      again: ''
    }
  }
  render(){
    return (
      <div className='Register'>
      <label>Username:</label>
      <input placeholder='BobDylan247' onChange={(e) =>{
        this.setState({username: e.target.value})
      }}></input><br />
      <label>Email:</label>
      <input placeholder='BobDylan@posti.fi' onChange={(e) =>{
        this.setState({email: e.target.value})
      }}></input><br />
      <label>Password:</label>
      <input type='password' placeholder='secret password' onChange={(e) =>{
        this.setState({password: e.target.value})
      }}></input><br />
      <label>Again:</label>
      <input type='password' placeholder='password again' onChange={(e) =>{
        this.setState({again: e.target.value})
      }}></input><br />
      <button>Pena</button>
      </div>
    )
  }
}
