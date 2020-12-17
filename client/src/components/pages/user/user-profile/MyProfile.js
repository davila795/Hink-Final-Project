import React, { Component } from 'react'
import { Col, Container, Row, Button, Card } from 'react-bootstrap'
import Loader from '../../../shared/spinner/Loader'
import ProfileEdit from '../edit-profile/ProfileEdit'
import CollapseAnimation from '../../../shared/collapse/CollapseAnimation'
import UserService from '../../../../services/user.service'
import ReactCountryFlag from "react-country-flag"
import countryList from 'react-select-country-list'
import Popup from '../../../shared/popup/PopUp'
import Alert from '../../../shared/alert/Alert'
import './UserProfile.css'


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: undefined,
            showModal: false,
            titleModal: 'Edit Profile',
            showToast: false,
            toastText: '',
            toastColor: '',
        }
        this.userService = new UserService()
    }

    componentDidMount = () => this.refreshUser()

    refreshUser = () => {
        this.userService
            .getProfile(this.props.loggedUser._id)
            .then(response => {
                console.log(response.data)
                this.setState({ user: response.data })
            })
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
    }

    removeContact = contactId => {
        this.userService
            .deleteContact(contactId)
            .then(() => this.refreshUser())
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
    }

    removeAttending = meetingId => {
        this.userService
            .deleteMeeting(meetingId)
            .then(() => this.refreshUser())
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
    }

    handleModal = visible => this.setState({ showModal: visible })

    handleToast = (visible, text, color) => this.setState({ showToast: visible, toastText: text, toastColor: color })

    render() {
        return (
            <>
                <Container className='user-profile'>
                    {this.state.user
                        ?
                        <>
                            <Row style={{marginBottom:'40px'}}>
                                <Col md={{ span: 4, offset: 1 }}>
                                    <h1>User Profile ⤵</h1>
                                </Col>
                            </Row>
                            <Row >
                                <Col md={3} style={{ textAlign: 'center' }}>
                                    <CollapseAnimation array={this.state.user.contacts} remove={this.removeContact} buttonTitle='Contacts' />
                                </Col>
                                <Col md={6} >
                                    <Card style={{ textAlign: 'center' }}>
                                        <Card.Body>
                                            <div style={{ backgroundColor: 'rgba(66, 157, 171,.2)', padding: '20px 0 20px 0', marginBottom: '20px', borderRadius: '20px' }}>
                                                <img src={this.state.user.avatar} style={{ borderRadius: '50%', width: 150 }} />
                                            </div>
                                            <Card.Title>
                                                <figure>
                                                    <small className="text-muted">{this.state.user.username + ' '}</small>
                                                    <ReactCountryFlag countryCode={countryList().getValue(this.state.user.origin)} svg style={{ width: '30px' }} />
                                                </figure>
                                                {this.state.user.fullname + ' '}
                                            </Card.Title>
                                            <Card.Text>
                                                {this.state.user.description}<br /><br />
                                                <strong>Actual city: </strong>{this.state.user.city}<br /><br />
                                                <strong>Origin: </strong>{this.state.user.origin}<br /><br />
                                                Contact me at <strong>{this.state.user.email}</strong><br />
                                            </Card.Text>
                                            <Button variant='outline-dark' size='sm' onClick={() => this.handleModal(true)} >Edit Profile</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3} style={{ textAlign: 'center' }}>
                                    <CollapseAnimation array={this.state.user.attending} remove={this.removeAttending} buttonTitle='Attending' />
                                </Col>
                            </Row>
                        </>
                        :
                        <Loader />
                    }
                </Container >

                <Popup show={this.state.showModal} handleModal={this.handleModal} title={this.state.titleModal}>
                    <ProfileEdit closeModal={() => this.handleModal(false)} handleToast={this.handleToast} storeUser={this.props.storeUser} updateUser={this.refreshUser} user={this.state.user} />
                </Popup>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} toastColor={this.state.toastColor} />
            </>
        )
    }

}

export default Profile