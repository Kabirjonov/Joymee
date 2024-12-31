import React, { useEffect, useState } from 'react';
import { MdAttachMoney, MdDelete } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import Carousel  from '../../home/carousel/carousel';
import Skeleton from "react-loading-skeleton";
const HouseInfo = ({ house }) => {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (!house || !house.coordinates) setIsLoading(true)
        else setIsLoading(false)
    }, [house])
    const { author } = house || {};
    return (
        <div className="list-group list-group-flush">
            <div className="list-group-item my-3">
                <div className="row mb-3 d-flex align-items-center">
                    <div className="col-lg-6 col-sm-12">
                        {isLoading ? (
                            <Skeleton height={100} count={2} />
                        ) : (
                            <div className="col-lg-6 col-sm-12 w-100 h-100">
                                <Carousel house={house} />
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
                                    href={`https://yandex.com/maps/?ll=${house.coordinates[1]},${house.coordinates[0]}&z=18&pt=${house.coordinates[1]},${house.coordinates[0]}`}>
                                    <i class="bi bi-geo-alt-fill text-warning mb-1"></i>
                                    {' ' + house.viloyat + ' ' + house.shaxar + ' ' + house.tuman}
                                </a>
                                </strong>
                                </li>
                                <li className="list-group-item d-flex">Narxi:<strong>{house.price}</strong><MdAttachMoney /></li>
                                <li className="list-group-item d-flex">Uy turi:<strong>{house.tur}</strong></li>
                                <li className="list-group-item d-flex">Uy maydoni:<strong>{house.area} km²</strong></li>
                                <li className="list-group-item d-flex">Sotuv turi:<strong>{house.type}</strong></li>
                                {house.comment && (
                                    <li className="list-group-item d-flex">Uy haqida:<strong>{house.comment}</strong></li>
                                )}
                                <li className="list-group-item d-flex">E'lon yaratilgan sana:<strong>{new Date(house.createdAt).toLocaleDateString()}</strong></li>
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
