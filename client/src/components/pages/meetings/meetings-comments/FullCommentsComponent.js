import { Link } from 'react-router-dom'
import logo from './021fe8a2-0a97-478b-a9d9-767e3055b732_200x200.png'
import { Spinner, Col, Row } from 'react-bootstrap'
import CommentList from './CommentsList'
import CommentForm from './CommentForm'

export default (props) => {

    return (
        <>
            {props.comments
                ?
                <div className="bg-light shadow">
                    <Row>
                        <Col md={{ offset: 1 }}>
                            <header>
                                <h5>
                                    Comments
                                <span className="px-2" role="img" aria-label="Chat">💬</span>
                                </h5>
                            </header>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ span: 4, offset: 1 }} className="pt-3 border-right">
                            <p>Say something about this meeting</p>
                            {props.loggedUser ?
                                <CommentForm loggedUser={props.loggedUser} meetingId={props.meetingId} updateMeeting={props.updateMeeting} />
                                :
                                <Link to='/login' className='btn btn-info btn-sm'>Log in first</Link>
                            }
                        </Col>
                        <Col md={{ span: 7 }} className="pt-3 bg-white">
                            <CommentList comments={props.comments} />
                        </Col>
                    </Row>

                </div>
                :
                <Spinner animation="grow" role="status">
                    <img src={logo} width='40px' className='App' alt="logo" />
                </Spinner>
            }
        </>
    );

}