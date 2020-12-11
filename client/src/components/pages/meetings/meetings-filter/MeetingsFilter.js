import { RegionDropdown } from 'react-country-region-selector';
import { Row, Col, Form } from 'react-bootstrap'

const MeetingsFilter = ({ filters, handleInputCity, handleInputDate, handleInputType }) => {
    return (
        <>
            <Row style={{paddingBottom:'30px'}}>
                <Col md={6}>
                    <Form.Group controlId='city-search'>
                        <RegionDropdown
                            country="Spain"
                            value={filters.city}
                            onChange={val => handleInputCity(val)} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <Form.Group controlId="type-search">
                        <Form.Control as="select" type='text' value={filters.type} onChange={val => handleInputType(val.target.value)}>
                            <option></option>
                            <option>Beers</option>
                            <option>Party</option>
                            <option>Cultural</option>
                            <option>Language Exchange</option>
                            <option>Music</option>
                            <option>Sports</option>
                            <option>Others</option>
                        </Form.Control>
                        <small id='type-filter' className='form-text text-muted'>Type</small>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="sort-by-date">
                        <Form.Control as="select" type='text' value={filters.date} onChange={val => handleInputDate(val.target.value)}>
                            <option></option>
                            <option>Ascending</option>
                            <option>Descending</option>
                        </Form.Control>
                        <small id='date-filter' className='form-text text-muted'>Sort by date</small>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="keyword">
                        <Form.Control type="text" />
                        <small id='keyword-filter' className='form-text text-muted'>Keyword</small>
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}
export default MeetingsFilter