import { Jumbotron, Button, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'
import 'animate.css'

const Home = () => {
    return (
        <Jumbotron className='jumbotron animate__animated animate__backInRight'>
            <Row className='jumbotron-content'>
                <Col md={{ span: 7, offset: 2 }}>
                    <h1 className='animate__animated animate__swing animate__delay-1s'>Hink</h1>
                    <p className='animate__animated animate__swing animate__delay-1s'>
                        Live local!
                    </p>
                    <p className='animate__animated animate__backInRight animate__delay-1s'>
                        <Link to='/meetings' className='btn btn-outline-light btn-lg'>Check plans in your city+</Link>{' '}
                        <Link to='/chatroom' className='btn btn-outline-light btn-lg'>Straight in chatroom</Link>
                    </p>
                </Col>
            </Row>

        </Jumbotron>
    )
}

export default Home