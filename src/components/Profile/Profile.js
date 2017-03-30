import React, { Component } from 'react'
import { Textfield, Button, Snackbar } from 'react-mdl';
import { Link } from 'react-router-dom'
import { updateUser } from '../../helpers/auth'
import ChooseAvatar from '../ChooseAvatar'

export default class Profile extends Component {
  state = {
    uid:null,
    name:'',
    avatar:'none',
    isSnackbarActive:false,
    snackBarMsg:'' 
  }
  componentWillMount () {

    var loggedInAs = localStorage.getItem('loggedInAs')
    var loggedInAsName = localStorage.getItem('loggedInAsName')
    var loggedInAsCustomAvatar = localStorage.getItem('loggedInAsCustomAvatar')

    this.setState({name:loggedInAsName, avatar: loggedInAsCustomAvatar, uid: loggedInAs})

  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  handleAvatarChange = (avatar) => {
    this.setState({avatar: avatar});
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.uid && this.state.name && this.state.avatar) {
        updateUser({'uid':this.state.uid,'name':this.state.name,'avatar':this.state.avatar})
            .then(() => {
              this.setState({
                  isSnackbarActive: true,
                  snackBarMsg: "Your profile has been updated!"
              });
            })
    } else {
      this.setState({
        isSnackbarActive: true,
        snackBarMsg: "Fill out the fields ya lazy lump!"
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
        <div className="login" style={{'height':'380px'}}>
          <h1 className="login-header">Edit Profile</h1>
          <form onSubmit={this.handleSubmit}>
          <Textfield
              value={this.state.name} 
              name="name"
              onChange={this.handleChange}
              label="Display Name"
              type="text"
              floatingLabel
              style={{width: '300px', 'marginBottom':'20px'}}
          />
          <ChooseAvatar selected={this.state.avatar} changeHandler={this.handleAvatarChange} />
          <Button type="submit" raised accent ripple style={{'margin':'15px'}}>Save</Button>
          <div><Link to={'/'}><Button type="button" ripple>Back</Button></Link></div>
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