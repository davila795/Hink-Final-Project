import React, { Component } from 'react'
import MeetingService from '../../../../services/meetings.service'
import UploadService from '../../../../services/upload.service'
import { RegionDropdown } from 'react-country-region-selector';
import { Spinner, Row, Form, Button, Col } from 'react-bootstrap'
import logo from './021fe8a2-0a97-478b-a9d9-767e3055b732_200x200.png'

class EditMeetingForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            meeting: {
                title: props.meeting.title,
                image: props.meeting.image,
                description: props.meeting.description,
                type: props.meeting.type,
                location: props.meeting.location,
                city: props.meeting.city,
                owner: props.meeting.owner,
                date: props.meeting.date,
                time: props.meeting.time
            },
            uploadingActive: false
        }
        this.uploadService = new UploadService()
        this.meetingService = new MeetingService()
    }

    handleInputChange = e => this.setState({ meeting: { ...this.state.meeting, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()

        this.meetingService
            .editMeeting(this.props.meeting._id, this.state.meeting)
            .then(res => {
                this.props.updateMeeting()
                this.props.closeModal()
            })
            .catch(err => console.log(err))
    }

    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.uploadService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    meeting: { ...this.state.meeting, image: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => console.log('ERRORRR!', err))
    }

    selectCity = val => {
        this.setState({ meeting: { ...this.state.meeting, city: val } })
    }


    render() {

        return (
            <>
                <h1>Edit Meeting</h1>
                <hr />

                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" name="date" value={this.state.meeting.date} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="time">
                                <Form.Label>Time</Form.Label>
                                <Form.Control type="time" name="time" value={this.state.meeting.time} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="type">
                                <Form.Label>Type</Form.Label>
                                <Form.Control as="select" type='text' name='type' value={this.state.meeting.type} onChange={this.handleInputChange}>
                                    <option></option>
                                    <option>Beers</option>
                                    <option>Party</option>
                                    <option>Cultural</option>
                                    <option>Language Exchange</option>
                                    <option>Music</option>
                                    <option>Sports</option>
                                    <option>Others</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='city'>
                                <Form.Label>City</Form.Label><br />
                                <RegionDropdown
                                    country="Spain"
                                    value={this.state.meeting.city}
                                    onChange={(val) => this.selectCity(val)} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" value={this.state.meeting.title} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as='textarea' rows={3} name="description" value={this.state.meeting.description} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" name="location" value={this.state.meeting.location} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Image (file) {this.state.uploadingActive &&
                                    <Spinner animation="grow" role="status">
                                        <img src={logo} width='40px' className='App' alt="logo" />
                                    </Spinner>}
                                </Form.Label>
                                <Form.Control type="file" onChange={this.handleImageUpload} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="info" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Uploading Image' : 'Save Changes'}</Button>
                </Form>
            </>
        )
    }
}

export default EditMeetingForm