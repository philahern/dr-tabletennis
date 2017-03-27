import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../helpers/auth'
import { isDialogAvailable } from '../helpers/polyfill'
import logo from '../logo.png';
import { IconButton, Menu, MenuItem, Grid, Cell } from 'react-mdl'
import About from './About'

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
      <nav className="top-nav" style={{width:'100%'}}>
        <Grid className="demo-grid-1">
          <Cell col={5}><Link to="/" className="navbar-brand"><img width="40px" src={logo} className="logo" alt="logo" /> <span className="logo-text">Digital River Table Tennis</span></Link></Cell>
          <Cell col={4}></Cell>
          <Cell col={3}>
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
          </Cell>
        </Grid>
      </nav>
    )
  }
}
