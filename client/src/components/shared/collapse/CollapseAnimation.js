import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Collapse, ListGroup } from 'react-bootstrap'
import './CollapseAnimation.css'

export default ({ array, remove, buttonTitle }) => {

    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(!open)} size='sm' aria-controls="example-collapse-text" variant='info' aria-expanded={open}>
                {buttonTitle}
            </Button>
            <Collapse in={open}>
                <ListGroup className='countries-list' style={{ textAlign: 'start' }}>
                    {array.map(elm => {
                        return (
                            <div key={elm._id} >
                                <Link to={elm.title ? `/meetings/${elm._id}` : `/profile/${elm._id}`} className='list-group-item-action' >
                                    <img className='contact-img' src={elm.avatar || elm.image} alt={elm.username || elm.title} />{elm.title || elm.fullname}
                                </Link>
                                {
                                    remove &&
                                    <div style={{ textAlign: 'end' }}>
                                        <Button className="btn-sm" variant='outline-danger' style={{ fontSize: 10, width: 50, padding: 0 }} onClick={() => remove(elm._id)}>Remove</Button>
                                    </div>
                                }
                            </div>
                        )
                    })
                    }
                </ListGroup>
            </Collapse>
        </>
    )
}