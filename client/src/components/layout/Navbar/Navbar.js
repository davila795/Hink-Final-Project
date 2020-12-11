import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from './021fe8a2-0a97-478b-a9d9-767e3055b732_200x200.png'
import './Navbar.css'

import AuthService from '../../../services/auth.service'

class Navigation extends Component {

    constructor() {
        super()
        this.authServices = new AuthService()
    }

    logOut = () => {
        this.authServices
            .logout()
            .then(resp => this.props.storeUser(undefined))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Navbar className='navbar' expand='md'>
                <Link to='/'>
                    <Navbar.Brand>
                        <img
                            alt="Logotipo"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                </Link>
                <Nav className="ml-auto">
                    <Link to='/'>
                        <Nav.Link as='div' style={{ color: 'white', fontWeight: 'bolder' }}>Home</Nav.Link>
                    </Link>
                    <Link to='/meetings'>
                        <Nav.Link as='div' style={{ color: 'white', fontWeight: 'bolder' }}>Discover</Nav.Link>
                    </Link>
                    {this.props.loggedUser
                        ?
                        <>
                            <Nav.Link as='div' style={{ color: 'white', fontWeight: 'bolder' }} onClick={this.logOut}>Logout</Nav.Link>
                            <Link to={`/profile/${this.props.loggedUser._id}`}>
                                <Nav.Link as='div' style={{ color: 'white', fontWeight: 'bolder' }}>{this.props.loggedUser.username + " "}<img className='navbar-img' src={this.props.loggedUser.avatar} alt={this.props.loggedUser.username} /></Nav.Link>
                            </Link>
                        </>
                        :
                        <>
                            <Link to='/signup'>
                                <Nav.Link as='div' style={{ color: 'white', fontWeight: 'bolder' }}>Signup</Nav.Link>
                            </Link>
                            <Link to='/login'>
                                <Nav.Link as='div' style={{ color: 'white', fontWeight: 'bolder' }}>Login</Nav.Link>
                            </Link>
                        </>
                    }
                </Nav>
            </Navbar>
        )
    }
}

export default Navigation