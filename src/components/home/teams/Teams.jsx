import React from 'react';
import './teams.css';
import Agent from './agent';
import Heading from '../../common/Heading';
import Carousel from 'react-bootstrap/Carousel';
import { featured } from '../../data/Data';

const Teams = () => {
    return (
        <section className="background padding">
            <div className="container">
                <Heading 
                    title="Our Featured Agents" 
                    subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." 
                />

{/*                 <Carousel> */}
{/*                 <Carousel.Item className='d-flex'> */}
                    // {featured.map((agent, index) => (
                            <Agent agent={agent} />
{/*                     ))}
                    </Carousel.Item>

                </Carousel> */}
            </div>
        </section>
    );
};

export default Teams;
