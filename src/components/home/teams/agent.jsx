import React from 'react';
import {Card,CardBody,CardTitle,CardSubtitle,CardText,Button} from 'reactstrap'
import {Link} from 'react-router-dom'
const Agent = () => {
    return (
        <div>
            <Card
                style={{
                    width: '18rem'
                }}
                className='text-center p-1 mx-2'
            >
                <img
                    alt="Sample"
                    src="https://picsum.photos/300/200"
                    className='rounded-circle w-50 h-75 m-auto'
                />
                <CardBody>
                    <CardTitle tag="h5">
                        Anvar Botirov
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Uy Sotuvchisi
                    </CardSubtitle>
                    <CardText>
                        Some quick example text to build on the card title and make up the bulk of the card‘s content.
                    </CardText>
                    <Link  className='btn btn-outline-warning'>
                        Profileni korish
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
}

export default Agent;
