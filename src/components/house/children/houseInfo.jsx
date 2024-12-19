import React, { useState, useEffect } from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { MdAttachMoney, MdDelete } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import axios from 'axios';
import { IoPersonSharp } from "react-icons/io5";
import Heading from '../../common/Heading';

const HouseInfo = ({ data }) => {
    const [author, setAuthor] = useState([])
    const id = data.author;

    useEffect(() => {
        const getData = async (id) => {
            console.log(id)
            const response = await axios.get(`http://localhost:3001/api/info/${id}`)
            if (response.status === 200) setAuthor(response.data)
        }
        getData(id)
    })
    return (
        <div className="list-group list-group-flush">
            <div className='list-group-item  my-3 position-relative'>
                <div className='row mb-3 d-flex center align-items-center' key={data._id}>
                    <div className='d-flex center align-items-center  col-lg-6 col-sm-12 '>
                        {false ? (//data.fileUrl
                            <img
                                src={fileUrl}
                                // alt="Profile"
                                className="rounded-circle border border-dark w-100 h-100"
                            />
                        ) : (
                            <FaImage className="icon_forPerson  h-100  m-auto" />
                        )}
                    </div>
                    <div className='d-flex justify-content-start col-lg-6  col-sm-12'>
                        <ul className='list-group list-group-flush d-flex justify-content-center'>
                            {/* bu yerda manzilni bosa yandex mapda coordinata lar berilgan location chiqish kerak */}
                            {/* <li className="list-group-item d-flex">Manzili:<span className='d-flex align-items-center text-primary'>{data.viloyat} viloyati,{data.shaxar} shaxri,{data.tuman} tumani.<IoLocationSharp /></span></li> */}
                            <li className="list-group-item d-flex align-items-center">Narxi:<strong>{data.price}</strong><MdAttachMoney /></li>
                            <li className="list-group-item d-flex align-items-center">Uy tur:<strong>{data.tur}</strong></li>
                            <li className="list-group-item d-flex align-items-center">Sotuv turi:<strong>{data.type}</strong></li>
                            <li className="list-group-item d-flex align-items-center">Uy maydoni:<strong>{data.area}km</strong></li>
                            {data.comment ? (
                                <li className="list-group-item d-flex align-items-center">Uy xaqida:<strong>{data.comment}</strong></li>
                            ) : ""}
                            <li className="list-group-item d-flex align-items-center">Elon Yaratilgan vaqti:<strong>{new Date(data.createdAt).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}</strong></li>
                        </ul>
                    </div>
                      <Heading title="Author by" SpecialClass="w-100 my-5 text-center"/>
                    <div className='col-lg-6 col-sm-12 d-flex align-items-center'>
                        {author.fileUrl ? (
                            <img
                                src={author.fileUrl}
                                // alt="Profile"
                                className="rounded-circle border border-dark w-100 h-100"
                            />
                        ) : (
                            <IoPersonSharp className="icon_forPerson  rounded-circle w-100 m-auto" />
                        )}
                    </div>
                    <div className="col-lg-6">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Ism Familya:</strong> {author.firstName} {author.lastName}
                            </li>
                            <li className="list-group-item">
                                <strong>Phone:</strong> {author.phone}
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HouseInfo;
