import { Col, Card } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const MeetingCard = ({ image, owner, _id, tittle, time, date, city, type }) => {

    return (

        <Col md={3} >
            <Card>
                <Card.Img variant="top" style={{ height: '140px', objectFit: 'cover' }} src={image} />
                <Card.Body>
                    <Link to={`meetings/${_id}`}>
                        <Card.Title>{tittle}</Card.Title>
                    </Link>
                    <p>{type}</p>
                    <small className="text-muted">{date.slice(0, 10)} at {time}</small><br />
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{city}</small><br />
                    <small className="text-muted">{'Created by: ' + owner.username}</small>
                </Card.Footer>
            </Card>
        </Col>
    )
}


export default MeetingCard