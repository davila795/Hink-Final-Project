import React, { Component } from 'react'
import { Col, Container, Row, Button, Spinner } from 'react-bootstrap'
import logo from './021fe8a2-0a97-478b-a9d9-767e3055b732_200x200.png'
import UserService from '../../../../services/user.service'
import ReactCountryFlag from "react-country-flag"
import countryList from 'react-select-country-list'
import './UserProfile.css'


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: undefined
        }
        this.userService = new UserService()
    }

    componentDidMount = () => this.refreshUser()

    refreshUser = () => {
        this.userService
            .getProfile(this.props.match.params.id)
            .then(response => this.setState({ user: response.data }))
            .catch(err => console.log(err))
    }

    addContact = () => {
        this.userService
            .addContact(this.state.user._id)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container className='user-profile'>
                {this.state.user
                    ?
                    <>
                        <Row >
                            <Col md={{ span: 4, offset: 1 }}>
                                <h1>User Profile ⤵</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: 'center' }}>
                                <img className='profile-img' src={this.state.user.avatar} style={{ width: '100%' }} alt={this.state.user.username} />
                                <h4>{this.state.user.username}</h4>
                            </Col>
                            <Col md={6}>
                                <h3>{this.state.user.fullname}<ReactCountryFlag countryCode={countryList().getValue(this.state.user.origin)} svg style={{ marginLeft: '10px', width: '30px' }} /></h3>
                                <hr />

                                <p>{this.state.user.description}</p>
                                <p><strong>Actual city: </strong>{this.state.user.city}</p>
                                <p><strong>Origin: </strong>{this.state.user.origin}</p>
                                <p>Contact me at <strong>{this.state.user.email}</strong></p>
                                {this.props.loggedUser._id === this.state.user._id
                                    ?
                                    <Button variant='outline-dark' size='sm' >Edit Profile</Button>
                                    :
                                    <Button variant='outline-info' size='sm' onClick={this.addContact}>Add Contact</Button>
                                }

                            </Col>
                        </Row>
                    </>

                    :
                    <Spinner animation="grow" role="status">
                        <img src={logo} width='40px' className='App' alt="logo" />
                    </Spinner>
                }
            </Container >
        )
    }

}

export default Profile