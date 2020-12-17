import React, { Component } from 'react'
import MeetingService from '../../../../services/meetings.service'
import UploadService from '../../../../services/upload.service'
import { Row, Form, Button, Col } from 'react-bootstrap'
import Loader from '../../../shared/spinner/Loader'
import Map from '../meetings-maps/MapForm'
import Alert from '../../../shared/alert/Alert'

class EditMeetingForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            meeting: {
                title: props.meeting.title,
                image: props.meeting.image,
                description: props.meeting.description,
                latitude: props.meeting.location.coordinates[0],
                longitude: props.meeting.location.coordinates[1],
                address: props.meeting.address,
                type: [],
                city: props.meeting.city,
                owner: props.meeting.owner,
                date: props.meeting.date,
                time: props.meeting.time
            },
            uploadingActive: false,
            showToast: false,
            toastText: '',
            toastColor: ''
        }
        this.uploadService = new UploadService()
        this.meetingService = new MeetingService()
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
            .editMeeting(this.props.meeting._id, this.state.meeting)
            .then(res => {
                this.props.updateMeeting()
                this.props.closeModal()
                this.props.handleToast(true, 'Meeting updated!', '#9fead7')
            })
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
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
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
    }

    handleToast = (visible, text, color) => this.setState({ showToast: visible, toastText: text, toastColor: color })

    render() {

        return (
            <>
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
                                        id='custom-inline-checkbox-modal-1'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Party"
                                        value='Party'
                                        type='checkbox'
                                        id='custom-inline-checkbox-modal-2'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Cultural"
                                        value='Cultural'
                                        type='checkbox'
                                        id='custom-inline-checkbox-modal-3'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Languages"
                                        value='Languages'
                                        type='checkbox'
                                        id='custom-inline-checkbox-modal-4'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Music"
                                        value='Music'
                                        type='checkbox'
                                        id='custom-inline-checkbox-modal-5'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Sports"
                                        value='Sports'
                                        type='checkbox'
                                        id='custom-inline-checkbox-modal-6'
                                    />
                                    <Form.Check
                                        onChange={this.handleTypeCheck}
                                        custom
                                        inline
                                        label="Other"
                                        value='Other'
                                        type='checkbox'
                                        id='custom-inline-checkbox-modal-7'
                                    />
                                </div>
                            </Form.Group>

                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Image (file) {this.state.uploadingActive && <Loader />}</Form.Label>
                                <Form.Control type="file" onChange={this.handleImageUpload} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group>
                        <Map
                            google={this.props.google}
                            center={{ lat: this.state.meeting.latitude, lng: this.state.meeting.longitude }}
                            height='300px'
                            zoom={15}
                            handleLocation={this.handleLocation}
                        />
                    </Form.Group>


                    <Button variant="info" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Uploading Image' : 'Save Changes'}</Button>
                </Form>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} toastColor={this.state.toastColor} />
            </>
        )
    }
}

export default EditMeetingForm