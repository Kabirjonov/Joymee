import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import img from '../images/room.jpg'
import Basic from '../OtherPageStyle/basic'
import axios from 'axios';
import { toast } from 'react-toastify';
import User from './children/userInfo';
import HouseInfo from './children/houseInfo'

const House = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({})
    const location = useLocation()
    const { id } = location.state || {}
    useEffect(() => {
        if (!id) return navigate('/')
        const getData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/info/${id}`);
                if (response.status == 200) setData(response.data)
            }
            catch (err) {
                toast.error(err.response.data.message)
            }
        }
        getData()
    }, [id])
    return (
        <Basic title="Information" cover={img}>
            {!data&& (
                <>
                <HouseInfo data={data}/>
                </>
            )}
        </Basic>
    );
}

export default House;
