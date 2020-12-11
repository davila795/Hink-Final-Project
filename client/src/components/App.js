import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/home/Home'

import { Switch, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import AuthServices from '../services/auth.service'

import Navigation from './layout/Navbar/Navbar'
import Login from './pages/auth/Login'
import Signup from './pages/auth/SignUp'
import MeetingsList from './pages/meetings/meetings-list/MeetingsList'
import MeetingDetails from './pages/meetings/meetings-details/MeetingDetails'
import Profile from './pages/user/user-profile/UserProfile'

import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: undefined }
    this.authServices = new AuthServices
  }

  componentDidMount = () => {
    this.authServices
      .isLoggedIn()
      .then(response => this.setTheUser(response.data))
      .catch(err => this.setTheUser(undefined))
  }

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El nuevo estado de App es:', this.state.loggedInUser))

  render() {
    return (
      <>
        <Navigation storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} />
        <main>
          <Switch>
            <Route path='/' exact render={() => <Home />} />
            <Route path='/meetings' exact render={() => <MeetingsList loggedUser={this.state.loggedInUser} />} />
            <Route path='/meetings/:id' render={props => <MeetingDetails loggedUser={this.state.loggedInUser} {...props} />} />
            <Route path="/signup" render={props => <Signup storeUser={this.setTheUser} {...props} />} />
            <Route path="/login" render={props => <Login storeUser={this.setTheUser} {...props} />} />
            {this.state.loggedInUser
              ?
              <Route path='/profile/:id' render={props => <Profile loggedUser={this.state.loggedInUser} {...props} />} />
              :
              <Redirect to='/login' />
            }
          </Switch>
        </main>

      </>
    )
  }

}

export default App;
