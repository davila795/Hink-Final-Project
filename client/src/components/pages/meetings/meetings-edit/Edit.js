import React, { Component } from 'react'
import MeetingService from '../../../../services/meetings.service'
import { RegionDropdown } from 'react-country-region-selector';


import { Form, Button } from 'react-bootstrap'

class EditMeetingForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tittle: props.meeting.tittle,
            description: props.meeting.description,
            type: props.meeting.type,
            location: props.meeting.location,
            city: props.meeting.city,
            owner: props.meeting.owner,
            date: props.meeting.date,
            time: props.meeting.time
        }
        this.meetingService = new MeetingService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.meetingService
            .editMeeting(this.props.meeting._id, this.state)
            .then(res => {
                this.props.updateMeeting()
                this.props.closeModal()
            })
            .catch(err => console.log(err))
    }

    selectCity = val => {
        this.setState({ city: val })
    }


    render() {

        return (
            <>
                <h1>Edit Meeting</h1>
                <hr />

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="tittle" value={this.state.tittle} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" name="location" value={this.state.location} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" value={this.state.date} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" name="time" value={this.state.time} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" type='text' name='type' value={this.state.type} onChange={this.handleInputChange}>
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
                            value={this.state.city}
                            onChange={(val) => this.selectCity(val)} />
                    </Form.Group>

                    <Button variant="dark" type="submit">Edit</Button>
                </Form>
            </>
        )
    }
}

export default EditMeetingForm