import React, { Component } from 'react'
import AuthService from './../../../services/auth.service'
import UploadService from '../../../services/upload.service'
import CountrySelection from './countryRegionFlag'
import Loader from '../../shared/spinner/Loader'
import Alert from '../../shared/alert/Alert'

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
            showToast: false,
            toastText: '',
            toastColor: '',
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
                this.props.history.push('/meetings')
                this.handleToast(true, `Hi there`, '#9fead7')
            })
            .catch(err => this.handleToast(true, err.response.data.Message[0].msg, '#ef7a7a'))
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
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
    }

    setCountryCity = ({ country, city }) => {
        this.setState({ user: { ...this.state.user, origin: country, city: city } })
    }

    handleToast = (visible, text, color) => this.setState({ showToast: visible, toastText: text, toastColor: color })

    render() {

        return (
            <>
                <Container className='signup-view animate__animated animate__fadeInDownBig'>

                    <Row >
                        <Col md={{ span: 6, offset: 3 }} style={{ textAlign: 'center' }}>
                            <h1>Sign up</h1>
                            <hr /><br />
                        </Col>
                    </Row>

                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md={6}>
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
                                <CountrySelection setCountryCity={this.setCountryCity} /><br></br>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="age">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control type="number" name="age" value={this.state.user.age} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Tell us something about you:</Form.Label>
                                    <Form.Control as='textarea' rows={3} name="description" value={this.state.user.description} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Image (file) {this.state.uploadingActive && <Loader />}
                                    </Form.Label>
                                    <Form.Control type="file" onChange={this.handleImageUpload} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="info" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Uploading Image' : 'Sign up'}</Button>
                    </Form>
                </Container >

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} toastColor={this.state.toastColor} />
            </>
        )
    }
}

export default Signup