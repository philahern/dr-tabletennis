import React, { Component } from 'react'
import { Textfield, Button, Snackbar } from 'react-mdl';
import { Link } from 'react-router-dom'
import { auth , saveUser } from '../helpers/auth'
import ChooseAvatar from './ChooseAvatar'

export default class Register extends Component {
  state = {
    email: '',
    password: '',
    name:'',
    avatar:'none',
    isSnackbarActive:false,
    snackBarMsg:'' 
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  handleAvatarChange = (avatar) => {
    this.setState({avatar: avatar});
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.email && this.state.password && this.state.name && this.state.avatar) {
      auth(this.state.email, this.state.password)
        .then((user) => {
          user.name = this.state.name
          user.customAvatar = this.state.avatar
          saveUser(user)
        })
        .catch((error) => {
          this.setState({
            isSnackbarActive: true,
            snackBarMsg: error.message
          });
        })
    } else {
      this.setState({
            isSnackbarActive: true,
            snackBarMsg: "Fill in all the fields, ya lazy lump!"
      });
    }
  }
  handleTimeoutSnackbar = () => {
    this.setState({ isSnackbarActive: false });
  }
  render () {
    const { isSnackbarActive, snackBarMsg } = this.state;
    return (
      <div id="login-container">
        <div className="login" style={{'height':'500px'}}>
          <h1 className="login-header">REGISTER</h1>
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
          <Textfield
              value={this.state.name} 
              name="name"
              onChange={this.handleChange}
              label="Display Name"
              type="text"
              floatingLabel
              style={{width: '300px', 'marginBottom':'20px'}}
          />
          <ChooseAvatar changeHandler={this.handleAvatarChange} />
          <Button type="submit" raised accent ripple>Register</Button>
          <div><Link to="/login" className="navbar-brand">Login</Link></div>
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