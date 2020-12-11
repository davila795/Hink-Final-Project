import React, { Component } from 'react'
import MeetingServices from '../../../../services/meetings.service'
import logo from './021fe8a2-0a97-478b-a9d9-767e3055b732_200x200.png'

import MeetingForm from './../meetings-form/New'
import MeetingCard from '../meetings-card/MeetingsCards'
import MeetingsFilter from '../meetings-filter/MeetingsFilter'
import CustomCarousel from './carousel/Carousel'

import { Container, Row, Button, Modal, Spinner } from 'react-bootstrap'
import './MeetingsList.css'

class MeetingsList extends Component {

    constructor() {
        super()
        this.state = {
            meetingsFromApi: undefined,
            meetingsByCity: undefined,
            meetings: undefined,
            filters: {
                city: '',
                type: '',
                date: '',
            },
            showModal: false,
        }
        this.meetingService = new MeetingServices()
    }

    componentDidMount = () => this.refreshMeetings()

    refreshMeetings = () => {
        this.meetingService
            .getMeetings()
            .then(res => this.setState({
                meetings: res.data,
                meetingsFromApi: res.data,
                meetingsByCity: res.data
            }))
            .catch(err => console.log(err))
    }

    handleInputCity = val => {
        this.setState({
            filters: { ...this.state.filters, city: val },
            meetingsByCity: this.state.meetingsFromApi.filter(elm => elm.city === val),
            meetings: this.state.meetingsFromApi.filter(elm => elm.city === val)
        })
    }

    handleInputType = val => {
        this.setState({
            filters: { ...this.state.filters, type: val },
            meetings: this.state.meetingsByCity.filter(elm => elm.type === val)
        })
    }

    handleInputDate = val => {

        const sortedMeetings = this.state.meetingsByCity
            .filter(elm => elm.date)
            .sort((a, b) => {
                a = a.date.split('/').reverse().join('')
                b = b.date.split('/').reverse().join('')
                return val === 'Descending' ? b.localeCompare(a) : a.localeCompare(b)
            })

        this.setState({
            filters: { ...this.state.filters, date: val },
            meetings: sortedMeetings
        })
    }

    loggedUserMeetings = () => {
        this.setState({ meetings: this.state.meetingsFromApi.filter(elm => elm.owner._id === this.props.loggedUser._id) })
    }

    resetSearch = () => this.setState({ meetings: this.state.meetingsFromApi, filters: { city: '', type: '', date: '' } })

    handleModal = visible => this.setState({ showModal: visible })

    render() {
        return (
            <>
                {this.state.meetings && <CustomCarousel meetings={this.state.meetings} />}
                <Container className='meetings-list'>

                    {this.props.loggedUser
                        &&
                        <Row style={{ justifyContent: 'flex-end' }}>
                            <Button onClick={() => this.handleModal(true)} variant="info" size="sm">Add Meeting</Button>
                        </Row>
                    }

                    <MeetingsFilter filters={this.state.filters} handleInputCity={this.handleInputCity} handleInputType={this.handleInputType} handleInputDate={this.handleInputDate} />

                    <Row style={{ justifyContent: 'space-between' }}>
                        <h3>Meetings Available:</h3>
                        {this.props.loggedUser && <Button variant='outline-info' onClick={this.loggedUserMeetings}>Your Meetings</Button>}
                        <Button variant='outline-danger' size='sm' onClick={this.resetSearch}>🗘Reset</Button>
                    </Row>
                    <br />

                    <Row>
                        {
                            this.state.meetings
                                ?
                                this.state.meetings.map(elm => <MeetingCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} />)
                                :
                                <Spinner animation="grow" role="status">
                                    <img src={logo} width='40px' className='App' alt="logo" />
                                </Spinner>
                        }
                    </Row>

                </Container >


                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <MeetingForm closeModal={() => this.handleModal(false)} updateList={this.refreshMeetings} loggedUser={this.props.loggedUser} />
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}

export default MeetingsList