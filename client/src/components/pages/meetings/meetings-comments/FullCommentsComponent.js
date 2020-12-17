import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import Loader from '../../../shared/spinner/Loader'
import CommentList from './CommentsList'
import CommentForm from './CommentForm'

export default (props) => {

    return (
        <>
            {props.comments
                ?
                <div className="bg-light shadow" style={{padding:20,margin:'20px 0'}}>
                    <Row>
                        <Col>
                            <header>
                                <h5>
                                    Comments
                                <span className="px-2" role="img" aria-label="Chat">💬</span>
                                </h5>
                            </header>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ span: 4 }} className="pt-3 border-right">
                            <p>Say something about this plan:</p>
                            {props.loggedUser ?
                                <CommentForm loggedUser={props.loggedUser} meetingId={props.meetingId} updateMeeting={props.updateMeeting} />
                                :
                                <Link to='/login' className='btn btn-info btn-sm'>Log in first</Link>
                            }
                        </Col>
                        <Col md={{ span: 8 }} className="pt-3 bg-white">
                            <CommentList comments={props.comments} />
                        </Col>
                    </Row>

                </div>
                :
                <Loader />
            }
        </>
    );

}