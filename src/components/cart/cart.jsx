import React, { useEffect, useState } from "react";
import Basic from '../OtherPageStyle/basic';
import img from '../images/room.jpg';
import axios from "axios";
import RecentCard from "../home/recent/RecentCard";
import Heading from "../common/Heading";

const Cart = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ids = JSON.parse(localStorage.getItem('saveIds')) || [];
        const getData = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cart`, { ids }); // IDs body orqali yuboriladi
                setHouses(response.data); // Backenddan kelgan ma'lumotlarni set qilish
                setLoading(false); // Loadingni false qilish
            } catch (err) {
                console.error("Error fetching cart data:", err);
                setLoading(false); // Xato bo'lsa ham loadingni to'xtatish
            }
        };
        getData(); // getData funksiyasini chaqirish
    }, []);

    if (loading) return <h1>Loading...</h1>;

    return (
        <Basic name="Your's save cart" title="Save" cover={img}>
                  <Heading title="Your's save items" SpecialClass="w-100 text-center" size="w-75 m-auto"/>
            <RecentCard houses={houses} />
        </Basic>
    );
};

export default Cart;
