import React, { Component } from 'react'
import UserService from '../../../../services/user.service'
import UploadService from '../../../../services/upload.service'
import CountrySelection from '../../auth/countryRegionFlag'
import { Spinner } from 'react-bootstrap'
import logo from './021fe8a2-0a97-478b-a9d9-767e3055b732_200x200.png'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class EditForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: props.user.username,
                email: props.user.email,
                origin: props.user.origin,
                city: props.user.city,
                age: props.user.age,
                fullname: props.user.fullname,
                description: props.user.description,
                avatar: props.user.avatar
            },
            uploadingActive: false
        }
        this.userService = new UserService()
        this.uploadService = new UploadService()

    }

    handleInputChange = e => this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } })

    handleSubmit = e => {

        e.preventDefault()

        this.userService
            .editProfile(this.state.user)
            .then(user => {
                this.props.updateUser()
                this.props.closeModal()
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

            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="fullname">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="fullname" value={this.state.user.fullname} onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={this.state.user.username} onChange={this.handleInputChange} />
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
                <Button variant="info" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Uploading Image' : 'Save'}</Button>
            </Form>
        )
    }
}

export default EditForm