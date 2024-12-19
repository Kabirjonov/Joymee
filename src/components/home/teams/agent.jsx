import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { IoPersonSharp } from "react-icons/io5";

const Agent = ({ agent }) => {
    const { firstName, lastName, phone, _id, email, bio, fileUrl } = agent
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <Card
                style={{
                    width: '90%',
                }}
                key={_id}
                className='text-center p-2  border '
            >
                {fileUrl ? (
                    <img
                        src={fileUrl}
                        // alt="Profile"
                        className="rounded-circle border border-dark w-100 h-100"
                    />
                ) : (
                    <IoPersonSharp className="icon_forPerson rounded-circle border border-dark w-50  m-auto" />
                )}
                {/* <img
                    alt="Sample"
                    src="https://picsum.photos/300/200"
                    className='rounded-circle w-50 h-75 m-auto'
                /> */}
                <CardBody>
                    <CardTitle tag="h5">
                        {firstName}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        {phone}
                    </CardSubtitle>
                    <CardText>
                        {bio}
                    </CardText>
                    <Link to={`/One`}state={{id:_id}} className='btn btn-outline-warning'>{/* bu yerda  */}
                        Sotuvchisi
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
}

export default Agent;
