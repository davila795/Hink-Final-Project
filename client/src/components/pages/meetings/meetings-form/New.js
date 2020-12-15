import React, { Component } from 'react'
import MeetingService from '../../../../services/meetings.service'
import UploadService from '../../../../services/upload.service'
import { RegionDropdown } from 'react-country-region-selector'
import { Form, Button, Spinner, Row, Col } from 'react-bootstrap'
import logo from './021fe8a2-0a97-478b-a9d9-767e3055b732_200x200.png'
import Map from '../../../map/MapForm'

class MeetingForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            meeting: {
                title: '',
                description: '',
                type: [],
                latitude: undefined,
                longitude: undefined,
                address: '',
                city: '',
                owner: props.loggedUser._id,
                date: undefined,
                time: undefined,
                image: undefined
            },
            uploadingActive: false
        }
        this.meetingService = new MeetingService()
        this.uploadService = new UploadService()
    }

    handleInputChange = e => this.setState({ meeting: { ...this.state.meeting, [e.target.name]: e.target.value } })

    handleTypeCheck = e => {

        if (e.target.checked) {
            this.setState({ meeting: { ...this.state.meeting, type: [...this.state.meeting.type, e.target.value] } })
        } else {
            const array = [...this.state.meeting.type]
            const index = array.indexOf(e.target.value)
            array.splice(index, 1)
            this.setState({ meeting: { ...this.state.meeting, type: array } })
        }
    }

    handleLocation = (latitude, longitude, address, city) => this.setState({ meeting: { ...this.state.meeting, latitude: latitude, longitude: longitude, address: address, city: city } })

    handleSubmit = e => {
        e.preventDefault()

        this.meetingService
            .saveMeeting(this.state.meeting)
            .then(res => {
                this.props.updateList()
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
                <h1>New Meeting</h1>
                <hr />

                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" value={this.state.meeting.title} onChange={this.handleInputChange} />
                            </Form.Group>


                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as='textarea' rows={3} name="description" value={this.state.meeting.description} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" name="date" value={this.state.meeting.date} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="time">
                                <Form.Label>Time</Form.Label>
                                <Form.Control type="time" name="time" value={this.state.meeting.time} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <div className="mb-3">
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Beers"
                                        value='Beers'
                                        type='checkbox'
                                        id='custom-inline-checkbox-1'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Party"
                                        value='Party'
                                        type='checkbox'
                                        id='custom-inline-checkbox-2'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Cultural"
                                        value='Cultural'
                                        type='checkbox'
                                        id='custom-inline-checkbox-3'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Languages"
                                        value='Languages'
                                        type='checkbox'
                                        id='custom-inline-checkbox-4'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Music"
                                        value='Music'
                                        type='checkbox'
                                        id='custom-inline-checkbox-5'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Sports"
                                        value='Sports'
                                        type='checkbox'
                                        id='custom-inline-checkbox-6'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Other"
                                        value='Other'
                                        type='checkbox'
                                        id='custom-inline-checkbox-7'
                                    />
                                </div>
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

                    <Form.Group>
                        <Map
                            google={this.props.google}
                            center={{ lat: 40.450620, lng: - 3.686573 }}
                            height='300px'
                            zoom={15}
                            handleLocation={this.handleLocation}
                        />
                    </Form.Group>


                    <Button variant="info" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Uploading Image' : 'Create Meeting'}</Button>
                </Form>
            </>
        )
    }
}

export default MeetingForm