import React, { useState, useEffect } from 'react';
import img from '../images/room.jpg'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import { IoLocationSharp } from "react-icons/io5";
import { MdAttachMoney, MdDelete } from "react-icons/md";
import './myhouse.css'
import Basic from '../OtherPageStyle/basic';
const Myhouses = () => {
    const token = Cookies.get('token')
    const [houses, setHouses] = useState([])
    const deleteItem = async (id) => {
        try {
            console.log(id)
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/myhouse`, {
                data: { id: id },
                headers: {
                    'x-auth-token': token,  // Fayl bilan yuborilgani uchun Content-Type ni o‘chirib tashlang
                },
            })

        } catch (err) {
            toast.error(err.response.data.message)
        }
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/myhouse`, {
                    headers: {
                        'x-auth-token': token,  // Fayl bilan yuborilgani uchun Content-Type ni o‘chirib tashlang
                    },
                })
                if (response.status === 200) setHouses(response.data)
            } catch (err) {
                console.log(err.response.data.message)
            }
        }
        getData()
    }, [houses])
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
                            <div className='list-group-item  my-3 position-relative'>
                                <MdDelete onClick={() => deleteItem(house._id)} className='position-absolute deleteItem' />

                                <div className='mb-3 row' key={house._id}>
                                    <div className='d-flex center align-items-center  col-lg-6 col-sm-12 '>
                                        <img className='w-100 h-100' src={img} alt="" />
                                    </div>
                                    <div className='d-flex justify-content-start col-lg-6  col-sm-12'>
                                        <ul className='list-group list-group-flush d-flex justify-content-center'>
                                            {/* bu yerda manzilni bosa yandex mapda coordinata lar berilgan location chiqish kerak */}
                                            <li className="list-group-item d-flex">Manzili:<span className='d-flex align-items-center text-primary'>{house.viloyat} viloyati,{house.shaxar} shaxri,{house.tuman} tumani.<IoLocationSharp /></span></li>
                                            <li className="list-group-item d-flex align-items-center">Narxi:<strong>{house.price}</strong><MdAttachMoney /></li>
                                            <li className="list-group-item d-flex align-items-center">Uy tur:<strong>{house.tur}</strong></li>
                                            <li className="list-group-item d-flex align-items-center">Sotuv turi:<strong>{house.type}</strong></li>
                                            <li className="list-group-item d-flex align-items-center">Uy maydoni:<strong>{house.area}km</strong></li>
                                            <li className="list-group-item d-flex align-items-center">Uy xaqida:<strong>{house.comment}</strong></li>
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
