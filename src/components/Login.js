import React, { Component } from 'react'
import { Textfield, Button, Snackbar } from 'react-mdl';
import { Link } from 'react-router-dom'
import { login } from '../helpers/auth'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    isSnackbarActive:false,
    snackBarMsg:'' 
  }
  handleChange = (event) => {
    if (event.target.name === 'email') {
        this.setState({email: event.target.value});
    }
    if (event.target.name === 'password') {
        this.setState({password: event.target.value});
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.state.email, this.state.password)    
      .catch((error) => {
        this.setState({
          isSnackbarActive: true,
          snackBarMsg: error.message
        });
    })
  }
  handleTimeoutSnackbar = () => {
    this.setState({ isSnackbarActive: false });
  }
  render () {
    const { isSnackbarActive, snackBarMsg } = this.state;
    return (
      <div id="login-container">
        <div className="login">
          <h1 className="login-header">LOGIN</h1>
          <form onSubmit={this.handleSubmit}>
          <Textfield
              value={this.state.email} 
              name="email"
              onChange={this.handleChange}
              label="Email"
              type="email"
              floatingLabel
              style={{width: '300px', 'marginBottom':'20px'}}
          />
          <Textfield
              value={this.state.password} 
              name="password"
              onChange={this.handleChange}
              label="Password"
              type="password"
              floatingLabel
              style={{width: '300px', 'marginBottom':'20px'}}
          />
          <Button type="submit" raised accent ripple>Login</Button>
          <div><Link to="/register" className="navbar-brand">Register</Link></div>
          </form>
        </div>
        <Snackbar
          active={isSnackbarActive}
          onClick={this.handleClickActionSnackbar}
          onTimeout={this.handleTimeoutSnackbar}>{snackBarMsg}</Snackbar> 
      </div>

    )
  }
}