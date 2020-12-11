import React, { Component } from "react";
import logo from './021fe8a2-0a97-478b-a9d9-767e3055b732_200x200.png'
import { Spinner, Col, Row, Container } from 'react-bootstrap'


class Comments extends Component {
    constructor() {
        super();

        this.state = {
            comments: undefined,
        };
    }

    componentDidMount = () => this.setState({ comments: this.props.comments })

    render() {

        return (
            <>
                {this.state.comments
                    ?
                    <div className="bg-light shadow">
                        <header>
                            <h5>
                                Comments
            <span className="px-2" role="img" aria-label="Chat">
                                    💬
            </span>
                            </h5>
                        </header>

                        <Row>
                            <Col className="col-4  pt-3 border-right">
                                <p>Say something about this meeting</p>
                                {/* Comment Form Component */}
                            </Col>
                            <Col className="col-8  pt-3 bg-white">
                                {/* Comment List Component */}
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
}

export default Comments;