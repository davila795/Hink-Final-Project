import React, { Component } from 'react'
import AuthService from './../../../services/auth.service'
import CountrySelection from './countryRegionFlag'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './SignUp.css'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            email: '',
            origin: '',
            city: '',
            age: 0,
            fullname: '',
            description: '',
        }
        this.authService = new AuthService()

    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/')        // redirección JS
            })
            .catch(err => console.log('There was an error:', err.response.data.Message))
    }

    setCountryCity = ({ country, city, code }) => {
        this.setState({ origin: country, city: city })
    }


    render() {

        return (

            <Container className='signup-view'>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Sign up</h1>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="fullname">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="fullname" value={this.state.fullname} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" name="age" value={this.state.age} onChange={this.handleInputChange} />
                            </Form.Group>
                            <CountrySelection setCountryCity={this.setCountryCity} /><br></br>
                            <Form.Group controlId="description">
                                <Form.Label>Tell us something about you:</Form.Label>
                                <Form.Control as='textarea' rows={3} name="description" value={this.state.description} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Button variant="info" type="submit">Sign up</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signup