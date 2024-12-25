import React, { useEffect, useState } from 'react';
import { MdAttachMoney, MdDelete } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { Carousel } from 'react-bootstrap';
import Skeleton from "react-loading-skeleton";
const HouseInfo = ({ data }) => {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        if(!data||!data.coordinates)setIsLoading(true)
        else setIsLoading(false)
    },[data])
    const { author, fileUrls } = data || {};
    return (
        <div className="list-group list-group-flush">
            <div className="list-group-item my-3">
                 <div className="row mb-3 d-flex align-items-center">
                    <div className="col-lg-6 col-sm-12">
                        {isLoading ? (
                            <Skeleton height={100} count={2} />
                        ) : (
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
                        )}

                    </div>
                    <div className="col-lg-6 col-sm-12">
                        {isLoading ? (
                            <ul className='list-group list-group-flush'>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <li key={index} className='list-group-item'>
                                        <Skeleton height='100%' width="100%" />
                                    </li>
                                ))}

                            </ul>
                        ) : (
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex">Manzili:<strong><a rel="noopener noreferrer"
                                    target="_blank"
                                    href={`https://yandex.com/maps/?ll=${data.coordinates[1]},${data.coordinates[0]}&z=18&pt=${data.coordinates[1]},${data.coordinates[0]}`}>
                                    <i class="bi bi-geo-alt-fill text-warning mb-1"></i>
                                    {' ' + data.viloyat + ' ' + data.shaxar + ' ' + data.tuman}
                                </a>
                                </strong>
                                </li>
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
                        )}

                    </div>
                </div> 
            </div>
        </div>
    );
};

export default HouseInfo;
