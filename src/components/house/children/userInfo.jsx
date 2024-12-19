import React from 'react';
import { IoPersonSharp } from "react-icons/io5";

const User = ({ data }) => {
    return (
        <div className='row'>
            <div className='col-lg-4 col-sm-12 d-flex align-items-center'>
                {data.fileUrl ? (
                    <img
                        src={fileUrl}
                        // alt="Profile"
                        className="rounded-circle border border-dark w-100 h-100"
                    />
                ) : (
                    <IoPersonSharp className="icon_forPerson  rounded-circle w-100 m-auto" />
                )}
            </div>
            <div className="col-lg-8">
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>First Name:</strong> {data.firstName}
                    </li>
                    <li className="list-group-item">
                        <strong>Last Name:</strong> {data.lastName}
                    </li>
                    <li className="list-group-item">
                        <strong>Email:</strong> {data.email}
                    </li>
                    <li className="list-group-item">
                        <strong>Birthday:</strong> {new Date(data.birthday).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">
                        <strong>Phone:</strong> {data.phone}
                    </li>
                    <li className="list-group-item">
                        <strong>Gender:</strong> {data.gender}
                    </li>
                    {data.bio ? (
                        <li className="list-group-item">
                            <strong>Bio:</strong> {data.bio}
                        </li>
                    ) : ""}

                </ul>
            </div>

        </div>
    );
}

export default User;
