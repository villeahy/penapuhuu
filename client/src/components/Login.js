import React from 'react'
import PropTypes from 'prop-types'

import privateForum from '../utils/privateForum'

export default class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.handleLogin = this.handleLogin.bind(this)
  }
  static contextTypes = {
    setLogged: PropTypes.func.isRequired
  }
  handleLogin(){
    const { setLogged } = this.context
    privateForum.getToken({username: this.state.username, password: this.state.password}).then(results=>setLogged(results))
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
      <button onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
}
