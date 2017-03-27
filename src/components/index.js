import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import TopNav from './TopNav'
import Login from './Login'
import Register from './Register'
import Home from './Home/Home'
import About from './About'
import Historical from './Historical/Historical'
import { firebaseAuth } from '../config/constants'
import classNames from 'classnames'
import { getUserData } from '../helpers/auth'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    user:{}
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {

      if (user) {
        getUserData(user.uid).then((snap) => {
          this.setState({
            authed: true,
            loading: false,
            user:snap.val()
          })
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    var contentClass = classNames({
        'content': true,
        'authed': this.state.authed
    });
    return this.state.loading === true ? <div className="spinner"></div> : (
      <BrowserRouter>
        <div>
          <TopNav authed={this.state.authed} user={this.state.user} />
          <div className={contentClass}>

              <Switch>
                <PrivateRoute authed={this.state.authed} path='/' exact component={Home} />
                <Route authed={this.state.authed} path='/about' component={About} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/historical/:player1/:player2' component={Historical} />
                <Route render={() => <h3>Nothing to see here for now.</h3>} />
              </Switch>

          </div>
        </div>
      </BrowserRouter>
    );
  }
}