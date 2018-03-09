import React from 'react'
import PropTypes from 'prop-types'

export default class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      again: ''
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  static contextTypes = {
    setLogged: PropTypes.func.isRequired,
    privateForum: PropTypes.object.isRequired
  }
  handleRegister(){
    const { privateForum } = this.context
    if(this.state.username === '' || this.state.password === ''||this.state.email === '' || this.state.password !== this.state.again){
      console.log('ei')
    }else{
      privateForum.createUser({username: this.state.username, password: this.state.password, email:this.state.email}).then(results=>alert(results.message))
      this.setState({username: '',
      email: '',
      password: '',
      again: ''})
    }
  }
  render(){
    const { username, email, password, again} = this.state
    return (
      <div className='Register'>
      <h3>Register</h3>
      <label>Username:</label>
      <input value={username} placeholder='BobDylan247' onChange={(e) =>{
        this.setState({username: e.target.value})
      }}></input><br />
      <label>Email:</label>
      <input value={email} placeholder='BobDylan@posti.fi' onChange={(e) =>{
        this.setState({email: e.target.value})
      }}></input><br />
      <label>Password:</label>
      <input value={password} type='password' placeholder='secret password' onChange={(e) =>{
        this.setState({password: e.target.value})
      }}></input><br />
      <label>Again:</label>
      <input value={again} type='password' placeholder='password again' onChange={(e) =>{
        this.setState({again: e.target.value})
      }}></input><br />
      <button onClick={this.handleRegister}>Register</button>
      </div>
    )
  }
}
