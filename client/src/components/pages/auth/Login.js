import React, { Component } from 'react'
import AuthService from '../../../services/auth.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Alert from '../../shared/alert/Alert'
import './Login.css'
import 'animate.css'


class Login extends Component {

    constructor() {
        super()
        this.state = {
            formInfo: {
                username: '',
                password: ''
            },
            showToast: false,
            toastText: '',
            toastColor: ''
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => this.setState({ formInfo: { ...this.state.formInfo, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .login(this.state.formInfo)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/meetings')        // redirección JS
            })
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
    }

    handleToast = (visible, text, color) => this.setState({ showToast: visible, toastText: text, toastColor: color })

    render() {

        return (
            <>
                <Container className='login-view animate__animated animate__fadeInDownBig'>

                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <h1>Login</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Button variant="info" type="submit">Login</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} toastColor={this.state.toastColor} />
            </>
        )
    }
}

export default Login