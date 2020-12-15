import React, { Component } from 'react'
import AuthService from './../../../services/auth.service'
import UploadService from '../../../services/upload.service'
import CountrySelection from './countryRegionFlag'
import { Spinner } from 'react-bootstrap'
import logo from './021fe8a2-0a97-478b-a9d9-767e3055b732_200x200.png'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './SignUp.css'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            user: {
                username: '',
                password: '',
                email: '',
                origin: '',
                city: '',
                age: 0,
                fullname: '',
                description: '',
                avatar: undefined
            },
            uploadingActive: false
        }
        this.authService = new AuthService()
        this.uploadService = new UploadService()

    }

    handleInputChange = e => this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } })

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state.user)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/')        // redirección JS
            })
            .catch(err => console.log('There was an error:', err.response.data.Message))
    }

    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.uploadService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    user: { ...this.state.user, avatar: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => console.log('ERRORRR!', err))
    }

    setCountryCity = ({ country, city }) => {
        this.setState({ user: { ...this.state.user, origin: country, city: city } })
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
                                <Form.Control type="text" name="fullname" value={this.state.user.fullname} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.user.username} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.user.password} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={this.state.user.email} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" name="age" value={this.state.user.age} onChange={this.handleInputChange} />
                            </Form.Group>
                            <CountrySelection setCountryCity={this.setCountryCity} /><br></br>
                            <Form.Group controlId="description">
                                <Form.Label>Tell us something about you:</Form.Label>
                                <Form.Control as='textarea' rows={3} name="description" value={this.state.user.description} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image (file) {this.state.uploadingActive &&
                                    <Spinner animation="grow" role="status">
                                        <img src={logo} width='40px' className='App' alt="logo" />
                                    </Spinner>}
                                </Form.Label>
                                <Form.Control type="file" onChange={this.handleImageUpload} />
                            </Form.Group>
                            <Button variant="info" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Uploading Image' : 'Sign up'}</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signup