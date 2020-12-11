import { Carousel } from 'react-bootstrap'
const customCarousel = ({ meetings }) => {
    
    return (
        <Carousel>
            {meetings.map((elm, idx) => {
                return (
                    <Carousel.Item key={idx}>
                        <img
                            className="d-block w-100"
                            style={{ height: '400px', objectFit: 'cover' }}
                            src={elm.image}
                            alt={elm.tittle}
                        />
                        <Carousel.Caption>
                            <h3>{elm.tittle}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}

export default customCarousel