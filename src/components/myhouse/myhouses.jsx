import React, { useState, useEffect } from 'react';
import img from '../images/room.jpg'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import { IoLocationSharp } from "react-icons/io5";
import { MdAttachMoney, MdDelete } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import './myhouse.css'
import Basic from '../OtherPageStyle/basic';
import Carousel from '../home/carousel/carousel'
const Myhouses = () => {
    const token = Cookies.get('token')
    const [houses, setHouses] = useState([])
    const [isLoading,setIsLoading]=useState(false)
    const deleteItem = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/myhouse`, {
                data: { id },
                headers: {
                    'x-auth-token': token,
                },
            });
            if (response.status === 200) {
                toast.success("Item deleted successfully");
                setHouses(prevHouses => prevHouses.filter(house => house._id !== id));  // Optimistic update
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete item");
            console.error(err);
        }finally{
            setIsLoading(false)
        }
    };
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/myhouse`, {
                    headers: {
                        'x-auth-token': token,
                    },
                })
                if (response.status === 200) setHouses(response.data)
            } catch (err) {
                console.log(err.response?.data?.message || 'Error occurred');
            }
        }
        getData()
    }, [])
    return (
        <Basic name="Contact Us" title="Get Help & Friendly Support" cover={img}>
            {houses.length === 0 ? (
                <>
                    <h3 className="heading_h1 text-center mb-2" style={{ textTransform: "initial" }}>Sizda e'lon mavjid emas!</h3>
                </>
            ) : (
                <>
                    <h3 className="heading_h1 text-center mb-2">Sizning Elonlaringiz</h3>
                    <div className="list-group list-group-flush">
                        {houses.map((house) => (
                            <div className='list-group-item  my-3 position-relative' key={house._id}>
                                <MdDelete onClick={() => deleteItem(house._id)} disabled={isLoading} className='position-absolute deleteItem' />
                                <div className='mb-3 row' key={house._id}>
                                    <div className='d-flex center align-items-center  col-lg-6 col-sm-12 '>
                                         {house.fileUrls && house.fileUrls.length > 0 ? (
                                         <Carousel house={house}/>
                                        ) : (
                                            <FaImage className="icon_forPerson h-100 m-auto"/>
                                        )} 
                                    </div>
                                    <div className='d-flex justify-content-start col-lg-6  col-sm-12'>
                                        <ul className='list-group list-group-flush d-flex justify-content-center'>
                                            <li className="list-group-item d-flex">Manzili:<strong><a rel="noopener noreferrer"
                                                target="_blank"
                                                href={`https://yandex.com/maps/?ll=${house.coordinates[1]},${house.coordinates[0]}&z=18&pt=${house.coordinates[1]},${house.coordinates[0]}`}>
                                                <i class="bi bi-geo-alt-fill text-warning mb-1"></i>
                                                {' ' + house.viloyat + ' ' + house.shaxar + ' ' + house.tuman}
                                            </a>
                                            </strong>
                                            </li>
                                            <li className="list-group-item d-flex align-items-center">Narxi:<strong>{house.price}</strong><MdAttachMoney /></li>
                                            <li className="list-group-item d-flex align-items-center">Uy tur:<strong>{house.tur}</strong></li>
                                            <li className="list-group-item d-flex align-items-center">Sotuv turi:<strong>{house.type}</strong></li>
                                            <li className="list-group-item d-flex align-items-center">Uy maydoni:<strong>{house.area}km</strong></li>
                                            {house.comment&&(
                                            <li className="list-group-item d-flex align-items-center">Uy xaqida:<strong>{house.comment}</strong></li>
                                            )}
                                            <li className="list-group-item d-flex align-items-center">Elon Yaratilgan vaqti:<strong>{new Date(house.createdAt).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </Basic>


    );
}

export default Myhouses;
