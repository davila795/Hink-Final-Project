import React, { Component } from 'react'
import { RegionDropdown } from 'react-country-region-selector';
import { Row, Col, Form, Button } from 'react-bootstrap'

class MettingsFilter extends Component {
    constructor() {
        super()
        this.state = {
            Beers: false,
            Party: false,
            Cultural: false,
            Languages: false,
            Music: false,
            Sports: false,
            Other: false
        }
    }

    updateCheck = target => target.checked ? this.setState({ [target.name]: true }) : this.setState({ [target.name]: false })

    uncheckAll = () => this.setState({
        Beers: false,
        Party: false,
        Cultural: false,
        Languages: false,
        Music: false,
        Sports: false,
        Other: false
    })


    render() {

        const { filters, handleInputCity, handleInputDate, handleInputType, reset, loggedUser, getUserMeetings, handleKeyword } = this.props

        return (
            <>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="sort-by-date">
                            <Form.Control as="select" type='text' value={filters.date} onChange={e => handleInputDate(e.target.value)}>
                                <option></option>
                                <option>Ascending</option>
                                <option>Descending</option>
                            </Form.Control>
                            <small id='date-filter' className='form-text text-muted'>Sort by date</small>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="keyword">
                            <Form.Control type="text" value={filters.keyword} onChange={e => handleKeyword(e.target.value)} />
                            <small id='keyword-filter' className='form-text text-muted'>Keyword</small>
                        </Form.Group>
                    </Col>
                    <Col md={4} >
                        <Form.Group controlId='city-search' style={{ textAlign: 'end' }}>
                            <RegionDropdown
                                country="Spain"
                                value={filters.city}
                                onChange={val => handleInputCity(val)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '30px', justifyContent: 'space-between' }}>
                    <Col md={8}>
                        <Form.Group>
                            <div className="mb-3">
                                <Form.Check
                                    onClick={e => this.updateCheck(e.target)}
                                    onChange={handleInputType}
                                    custom
                                    inline
                                    name='Beers'
                                    label="Beers"
                                    value='Beers'
                                    type='checkbox'
                                    id='custom-inline-checkbox-1'
                                    checked={this.state.Beers}
                                />
                                <Form.Check
                                    onClick={e => this.updateCheck(e.target)}
                                    onChange={handleInputType}
                                    custom
                                    inline
                                    name='Party'
                                    label="Party"
                                    value='Party'
                                    type='checkbox'
                                    id='custom-inline-checkbox-2'
                                    checked={this.state.Party}
                                />
                                <Form.Check
                                    onClick={e => this.updateCheck(e.target)}
                                    onChange={handleInputType}
                                    custom
                                    inline
                                    name='Cultural'
                                    label="Cultural"
                                    value='Cultural'
                                    type='checkbox'
                                    id='custom-inline-checkbox-3'
                                    checked={this.state.Cultural}
                                />
                                <Form.Check
                                    onClick={e => this.updateCheck(e.target)}
                                    onChange={handleInputType}
                                    custom
                                    inline
                                    name='Languages'
                                    label="Languages"
                                    value='Languages'
                                    type='checkbox'
                                    id='custom-inline-checkbox-4'
                                    checked={this.state.Languages}

                                />
                                <Form.Check
                                    onClick={e => this.updateCheck(e.target)}
                                    onChange={handleInputType}
                                    custom
                                    inline
                                    name='Music'
                                    label="Music"
                                    value='Music'
                                    type='checkbox'
                                    id='custom-inline-checkbox-5'
                                    checked={this.state.Music}
                                />
                                <Form.Check
                                    onClick={e => this.updateCheck(e.target)}
                                    onChange={handleInputType}
                                    custom
                                    inline
                                    name='Sports'
                                    label="Sports"
                                    value='Sports'
                                    type='checkbox'
                                    id='custom-inline-checkbox-6'
                                    checked={this.state.Sports}
                                />
                                <Form.Check
                                    onClick={e => this.updateCheck(e.target)}
                                    onChange={handleInputType}
                                    custom
                                    inline
                                    name='Other'
                                    label="Other"
                                    value='Other'
                                    type='checkbox'
                                    id='custom-inline-checkbox-7'
                                    checked={this.state.Other}
                                />
                            </div>
                        </Form.Group>
                    </Col>
                    {loggedUser && <Button variant='outline-info' onClick={getUserMeetings}>Your Meetings</Button>}
                    <Button variant='outline-danger' size='sm' onClick={reset}>🗘Reset</Button>
                </Row>
            </>
        )
    }
}

export default MettingsFilter