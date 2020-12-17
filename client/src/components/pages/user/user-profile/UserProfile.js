import React, { Component } from 'react'
import { Col, Container, Row, Button, Card } from 'react-bootstrap'
import CollapseAnimation from '../../../shared/collapse/CollapseAnimation'
import Loader from '../../../shared/spinner/Loader'
import UserService from '../../../../services/user.service'
import ReactCountryFlag from "react-country-flag"
import countryList from 'react-select-country-list'
import Alert from '../../../shared/alert/Alert'
import './UserProfile.css'


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: undefined,
            showToast: false,
            toastText: '',
            toastColor: '',
        }
        this.userService = new UserService()
    }

    componentDidMount = () => this.refreshUser()

    componentDidUpdate = () => {
        this.props.match.params.id !== this.state.user._id && this.refreshUser()
    }

    refreshUser = () => {
        this.userService
            .getProfile(this.props.match.params.id)
            .then(response => {
                console.log(response.data)
                this.setState({ user: response.data })
            })
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
    }

    addContact = () => {
        this.userService
            .addContact(this.state.user._id)
            .then(response => this.handleToast(true, 'Added to your contacts list', '#9fead7'))
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
    }

    handleToast = (visible, text, color) => this.setState({ showToast: visible, toastText: text, toastColor: color })

    render() {
        return (
            <>

                <Container className='user-profile'>
                    {this.state.user
                        ?
                        <>
                            <Row style={{ marginBottom: '40px' }}>
                                <Col md={{ span: 4, offset: 1 }}>
                                    <h1>User Profile ⤵</h1>
                                </Col>
                            </Row>
                            <Row >
                                <Col md={3} style={{ textAlign: 'center' }}>
                                    <CollapseAnimation array={this.state.user.contacts} buttonTitle='Contacts' />
                                </Col>
                                <Col md={6} >
                                    <Card style={{ textAlign: 'center' }}>
                                        <Card.Body>
                                            <div style={{ backgroundColor: 'rgba(66, 157, 171,.2)', padding: '20px 0 20px 0', marginBottom: '20px', borderRadius: '20px' }}>
                                                <img src={this.state.user.avatar} style={{ borderRadius: '50%', width: 150, objectFit: 'cover' }} />
                                            </div>
                                            <Card.Title>
                                                <figure>
                                                    <small className="text-muted">{this.state.user.username + ' '}</small>
                                                    <ReactCountryFlag countryCode={countryList().getValue(this.state.user.origin)} svg style={{ width: '30px' }} />
                                                </figure>
                                                {this.state.user.fullname + ' '}

                                                <Button variant='outline-info' size='sm' style={{ fontSize: 10, width: 50, padding: 0 }} onClick={this.addContact}>Add</Button>
                                            </Card.Title>
                                            <Card.Text>
                                                {this.state.user.description}<br /><br />
                                                <strong>Actual city: </strong>{this.state.user.city}<br /><br />
                                                <strong>Origin: </strong>{this.state.user.origin}<br /><br />
                                                Contact me at <strong>{this.state.user.email}</strong><br />
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3} style={{ textAlign: 'center' }}>
                                    <CollapseAnimation array={this.state.user.attending} buttonTitle='Attending' />
                                </Col>
                            </Row>
                        </>
                        :
                        <Loader />
                    }
                </Container >

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} toastColor={this.state.toastColor} />
            </>
        )
    }

}

export default Profile