import { Carousel } from 'react-bootstrap'
const customCarousel = ({ meetings }) => {

    return (
        <Carousel>
            {meetings.map((elm, idx) => {
                return (
                    <Carousel.Item key={idx} interval={2000}>
                        <img
                            className="d-block w-100"
                            style={{ height: '70vh', objectFit: 'cover' }}
                            src={elm.image}
                            alt={elm.title}
                        />
                        <Carousel.Caption>
                            <h3>{elm.title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}

export default customCarousel