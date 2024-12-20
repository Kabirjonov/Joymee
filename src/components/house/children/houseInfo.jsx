import React, { useState, useEffect } from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { MdAttachMoney, MdDelete } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { Carousel } from 'react-bootstrap';
import { IoPersonSharp } from "react-icons/io5";
import Heading from '../../common/Heading';

const HouseInfo = ({ data }) => {
    const { author, fileUrls } = data || {};
    return (
        <div className="list-group list-group-flush">
            <div className="list-group-item my-3">
                <div className="row mb-3 d-flex align-items-center">
                    <div className="col-lg-6 col-sm-12">
                        {fileUrls && fileUrls.length > 0 ? (
                            <Carousel>
                                {fileUrls.map((item, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={item}
                                            alt={`Slide ${index + 1}`}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        ) : (
                            <FaImage className="icon_forPerson h-100 m-auto" />
                        )}
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex">Narxi:<strong>{data.price}</strong><MdAttachMoney /></li>
                            <li className="list-group-item d-flex">Uy turi:<strong>{data.tur}</strong></li>
                            <li className="list-group-item d-flex">Uy maydoni:<strong>{data.area} km²</strong></li>
                            <li className="list-group-item d-flex">Sotuv turi:<strong>{data.type}</strong></li>
                            {data.comment && (
                                <li className="list-group-item d-flex">Uy haqida:<strong>{data.comment}</strong></li>
                            )}
                            <li className="list-group-item d-flex">E'lon yaratilgan sana:<strong>{new Date(data.createdAt).toLocaleDateString()}</strong></li>
                            {author && (
                                <>
                                    <li className="list-group-item d-flex">Egasining ismi: <strong>{author.firstName} {author.lastName}</strong></li>
                                    <li className="list-group-item d-flex">Telefon: <strong>{author.phone}</strong></li>
                                    <li className="list-group-item d-flex">Email: <strong>{author.email}</strong></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseInfo;
