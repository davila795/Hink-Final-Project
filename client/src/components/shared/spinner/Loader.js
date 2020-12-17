import { Spinner } from 'react-bootstrap'
import logo from './logo.png'

const Loader = () => {
    return (
        <Spinner animation="grow" role="status">
            <img src={logo} width='40px' className='App' alt="logo" />
        </Spinner>
    )
}

export default Loader