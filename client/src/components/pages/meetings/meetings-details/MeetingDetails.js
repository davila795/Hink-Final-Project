import React, { Component } from 'react'
import { Container, Row, Col, Button, Modal, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from './021fe8a2-0a97-478b-a9d9-767e3055b732_200x200.png'
import DetailedMap from '../../../map/EventDetailsMap'


import MeetingServices from '../../../../services/meetings.service'
import UserServices from '../../../../services/user.service'
import EditForm from '../meetings-edit/Edit'
import Comments from '../meetings-comments/FullCommentsComponent'

import './MeetingDetails.css'

class MeetingDetails extends Component {
    constructor() {
        super()
        this.state = {
            meeting: undefined,
            showModal: false,
        }
        this.meetingServices = new MeetingServices()
        this.userServices = new UserServices()
    }

    componentDidMount = () => this.refreshMeeting()


    refreshMeeting = () => {

        const meetingId = this.props.match.params.id
        this.meetingServices
            .getMeeting(meetingId)
            .then(response => {
                console.log(response)
                this.setState({ meeting: response.data })
            })
            .catch(err => console.log(err))
    }

    deleteMeeting = () => {

        const meetingId = this.props.match.params.id
        this.meetingServices
            .deleteMeeting(meetingId)
            .then(() => this.props.history.push('/meetings'))
            .catch(err => console.log(err))
    }

    attendMeeting = () => {

        const userPromise = this.userServices.addMeeting(this.state.meeting._id)
        const meetingPromise = this.meetingServices.addAssistant(this.state.meeting._id)

        Promise.all([userPromise, meetingPromise])
            .then(results => this.refreshMeeting())
            .catch(err => console.log(err))
    }

    handleModal = visible => this.setState({ showModal: visible })

    render() {

        return (
            <>
                <Container className='meeting-details'>
                    <Link to="/meetings" className="btn btn-sm btn-outline-dark">↹ Back</Link>
                    {this.state.meeting
                        ?
                        <>
                            <Row >
                                <Col md={{ span: 4, offset: 1 }} style={{ marginTop: '30px', marginBottom: '20px' }}>
                                    <h2>⨭Details</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 4, offset: 1 }} >
                                    <img src={this.state.meeting.image} style={{ width: '100%', borderRadius: '10px' }} alt={this.state.meeting.title} />
                                </Col>
                                <Col md={6}>
                                    <h3>{this.state.meeting.title}<small className="text-muted">{' | ' + this.state.meeting.type}</small></h3>
                                    <small className='text-muted'>{'by '}<Link to={`/profile/${this.state.meeting.owner._id}`}>{this.state.meeting.owner.username}</Link></small><br /><br />

                                    <p>{this.state.meeting.description}</p>
                                    <hr />
                                    <p>{this.state.meeting.address}</p>

                                    <p>{`${this.state.meeting.date.slice(0, 10)} || ${this.state.meeting.time}`}</p>

                                    {(this.props.loggedUser && this.props.loggedUser._id !== this.state.meeting.owner._id)
                                        &&
                                        <Button variant='outline-info' size='sm' onClick={this.attendMeeting}>GO!</Button>}

                                    {(this.props.loggedUser && this.props.loggedUser._id === this.state.meeting.owner._id)
                                        &&
                                        <>
                                            <Button variant='outline-dark' size='sm' style={{ margin: '0 10px' }} onClick={() => this.handleModal(true)}>Edit</Button>
                                            <Button variant='danger' size='sm' style={{ margin: '0 10px' }} onClick={this.deleteMeeting}>Delete</Button>
                                        </>
                                    }
                                </Col>
                            </Row>
                            < Row >
                                <Col md={{ span: 4, offset: 1 }}>
                                    <p style={{ marginRight: '5px' }}>{`Going(${this.state.meeting.assistants.length})⚡`}</p>

                                    {this.state.meeting.assistants.map((elm, idx) => <Link to={`/profile/${elm._id}`} key={idx}>
                                        <img className='img-link' src={elm.avatar} alt={elm.username} /></Link>)}
                                </Col>
                            </Row >

                            <Row>
                                <Col md={{ span: 10, offset: 1 }}>
                                    <Comments comments={this.state.meeting.comments} loggedUser={this.props.loggedUser} meetingId={this.state.meeting._id} updateMeeting={this.refreshMeeting} />
                                </Col>
                            </Row>
                            <DetailedMap
                                google={this.props.google}
                                coordinates={this.state.meeting.location.coordinates}
                                height='300px'
                                zoom={15}
                                address={this.state.meeting.address}
                            />
                        </>
                        :
                        <Spinner animation="grow" role="status">
                            <img src={logo} width='40px' className='App' alt="logo" />
                        </Spinner>
                    }

                </Container>

                <Modal show={this.state.showModal} size='lg' onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <EditForm closeModal={() => this.handleModal(false)} updateMeeting={this.refreshMeeting} meeting={this.state.meeting} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }



}

export default MeetingDetails