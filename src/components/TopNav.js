import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../helpers/auth'
import { isDialogAvailable } from '../helpers/polyfill'
import logo from '../logo.png';
import { IconButton, Menu, MenuItem } from 'react-mdl'
import About from './About'
import './TopNav.css'

export default class TopNav extends Component {

  state = {

  }

  handleCloseDialog = () => {
    this.setState({
      openDialog: false
    });
  }
  render () {
    if (!this.props.authed) {
      return null;
    }
    return (
      <nav className="top-nav">
        <div style={{'width': '60%'}}>
          <Link to="/" className="navbar-brand"><img width="40px" src={logo} className="logo" alt="logo" /> 
          <span className="logo-text hide-on-phone">Digital River Table Tennis</span>
          </Link>
        </div>
        <div style={{'width': '40%', 'textAlign':'right'}}>
            <div className="menu-dots" style={{position: 'relative'}}>
                <IconButton name="more_vert" id="demo-menu-lower-right" />
                <Menu target="demo-menu-lower-right" align="right">
                    <Link to="/profile" className="navbar-brand"><MenuItem>Edit Profile</MenuItem></Link>
                    <MenuItem onClick={() => {
                          logout()
                          this.setState({authed: false})
                        }}>Log Out</MenuItem>
                    <MenuItem onClick={() => {
                          this.setState({openDialog: true})
                        }}>About</MenuItem>
                </Menu>
                <img src={"/img/" + this.props.user.customAvatar + ".png"} alt={this.props.user.name} style={{'margin':'0', 'marginLeft':'10px', 'width': '35px'}} className="avatar" />
            </div>
            {isDialogAvailable() &&
              <About openDialog={this.state.openDialog} handleCloseDialog={this.handleCloseDialog} />
            }
        </div>
      </nav>
    )
  }
}
