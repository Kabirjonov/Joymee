import React, { useState, useEffect } from 'react';
import Back from '../back/Back';
import Footer from '../home/footer/Footer';
import img from '../images/room.jpg'
import { Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import { IoLocationSharp } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
const Myhouses = () => {
    const token = Cookies.get('token')
    const [houses, setHouses] = useState([])
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/house', {
                    headers: {
                        'x-auth-token': token,  // Fayl bilan yuborilgani uchun Content-Type ni o‘chirib tashlang
                    },
                })
                if(response.status===200)setHouses(response.data)
            } catch (err) {
                toast.error(err)
            }
        }
        fetch()
    }, [])
    return (
        <section className="about">
            <Back name="Contact Us" title="Get Help & Friendly Support" cover={img} />
            <section className="contact mt-5 mb-5">
                <div className="container">
                    <div className="contact__form border p-4 px-2 shadow">
                        {houses.length === 0 ? (
                            <>
                                <h3 className="heading_h1 text-center mb-2" style={{textTransform:"initial"}}>Sizda e'lon mavjid emas!</h3>
                            </>
                        ) : (
                            <>
                                <h3 className="heading_h1 text-center mb-2">Sizning Elonlaringiz</h3>
                                <div className="list-group list-group-flush">
                                    {houses.map((house) => (
                                        <div className='list-group-item'>
                                            <Row className='mb-3 ' key={house._id}>
                                                <Col className='d-flex center align-items-center '>
                                                    <img className='w-100 h-100' src={img} alt="" />
                                                </Col>
                                                <Col className='d-flex justify-content-start py-3'>
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
                                                    {console.log(house)}
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </section>
            <Footer />
        </section>
    );
}

export default Myhouses;
