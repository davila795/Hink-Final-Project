import React, { Component } from 'react'
import MeetingServices from '../../../../services/meetings.service'

import MeetingForm from './../meetings-form/New'
import MeetingCard from '../meetings-card/MeetingsCards'
import MeetingsFilter from '../meetings-filter/MeetingsFilter'
import CustomCarousel from './carousel/Carousel'
import Alert from '../../../shared/alert/Alert'
import Loader from '../../../shared/spinner/Loader'
import Popup from '../../../shared/popup/PopUp'

import { Container, Row, Button } from 'react-bootstrap'
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
                type: [],
                date: '',
                keyword: ''
            },
            showModal: false,
            showToast: false,
            titleModal: 'New Plan',
            toastText: '',
            toastColor: ''
        }
        this.meetingsFilterElement = React.createRef()
        this.meetingService = new MeetingServices()
    }

    componentDidMount = () => this.refreshMeetings()

    refreshMeetings = () => {

        this.meetingService
            .getMeetings()
            .then(res => this.setState({
                meetings: res.data,
                meetingsFromApi: res.data
            }))
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
    }

    handleInputCity = val => {

        this.setState({
            filters: { city: val, type: [], date: '', keyword: '' },
            meetingsByCity: this.state.meetingsFromApi.filter(elm => elm.city === val),
            meetings: this.state.meetingsFromApi.filter(elm => elm.city === val)
        })
        this.meetingsFilterElement.current.uncheckAll()
    }

    handleInputType = e => {

        const array = [...this.state.filters.type]
        if (array.includes(e.target.value)) {
            const index = array.indexOf(e.target.value)
            array.splice(index, 1)
        }

        e.target.checked
            ?
            this.setState({
                filters: { ...this.state.filters, type: [...this.state.filters.type, e.target.value] },
                meetings: (this.state.meetingsByCity || this.state.meetingsFromApi)
                    .filter(elm => {
                        return elm.type.some((type) => [...this.state.filters.type, e.target.value].includes(type))
                    })
            })
            :
            array.length === 0
                ?
                this.setState({
                    filters: { ...this.state.filters, type: [] },
                    meetings: this.state.meetingsByCity || this.state.meetingsFromApi
                })
                :
                this.setState({
                    filters: { ...this.state.filters, type: array },
                    meetings: (this.state.meetingsByCity || this.state.meetingsFromApi)
                        .filter(elm => elm.type.some(type => array.includes(type)))
                })
    }


    handleKeyword = val => {

        const valRegex = new RegExp(val, 'i')
        this.setState({
            filters: { ...this.state.filters, keyword: val },
            meetings: (this.state.meetingsByCity || this.state.meetingsFromApi)
                .filter(elm => valRegex.test(elm.title) || valRegex.test(elm.description))
        })
    }

    handleInputDate = val => {

        const sortedMeetings = (this.state.meetingsByCity || this.state.meetingsFromApi)
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

        this.meetingService
            .getUserMeetings(this.props.loggedUser._id)
            .then(response => this.setState({ meetings: response.data }))
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
    }

    resetSearch = () => {

        this.setState({
            meetings: this.state.meetingsFromApi,
            meetingsByCity: undefined,
            filters: { type: [], city: '', date: '', keyword: '' }
        })
        this.meetingsFilterElement.current.uncheckAll()
    }

    handleModal = visible => this.setState({ showModal: visible })

    handleToast = (visible, text, color) => this.setState({ showToast: visible, toastText: text, toastColor: color })

    render() {
        return (
            <>
                {this.state.meetingsFromApi ? <CustomCarousel meetings={this.state.meetingsFromApi} /> : <Loader />}

                <Container className='meetings-list'>

                    <MeetingsFilter ref={this.meetingsFilterElement} filters={this.state.filters} handleInputCity={this.handleInputCity} handleInputType={this.handleInputType} handleKeyword={this.handleKeyword} handleInputDate={this.handleInputDate} reset={this.resetSearch} loggedUser={this.props.loggedUser} getUserMeetings={this.loggedUserMeetings} /><hr />

                    <Row style={{ justifyContent: 'space-between' }}>
                        <h3>Plans Available:</h3>
                        {this.props.loggedUser &&
                            <Button onClick={() => this.handleModal(true)} variant="info" size="sm">Add Plan</Button>
                        }
                    </Row>
                    <br />

                    <Row>
                        {
                            this.state.meetings
                                ?
                                this.state.meetings.map(elm => <MeetingCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} />)
                                :
                                <Loader />
                        }
                    </Row>

                </Container >

                <Popup show={this.state.showModal} handleModal={this.handleModal} title={this.state.titleModal}>
                    <MeetingForm closeModal={() => this.handleModal(false)} handleToast={this.handleToast} updateList={this.refreshMeetings} loggedUser={this.props.loggedUser} />
                </Popup>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} toastColor={this.state.toastColor} />
            </>
        )
    }
}

export default MeetingsList