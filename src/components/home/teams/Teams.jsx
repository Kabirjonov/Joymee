import React, { useEffect, useState } from 'react';
import './teams.css';
import Agent from './agent';
import Heading from '../../common/Heading';
import Carousel from 'react-bootstrap/Carousel';
import { list } from '../../data/Data';
import Slider from "react-slick";
import { toast } from 'react-toastify'
import axios from 'axios';

const Teams = () => {
    const [agents, setAgents] = useState([])
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users',)
                if (response.status === 200) {
                    setAgents(response.data)
                }
            } catch (err) {
                toast.error(err.response?.data?.message || "An unexpected error occurred")

            }
        }
        getData()
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        // speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 768, // Tablet
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    useEffect(() => {
        console.log(agents)
    }, [agents])
    return (
        <section className="background padding">
            <div className="container">
                <Heading
                    title="Our Featured Agents"
                    subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                />
                <Slider {...settings}>
                    {agents.map(agent => (
                        <>
                            <Agent agent={agent} />
                        </>
                    ))}
                </Slider>

            </div>
        </section>
    );
};

export default Teams;
