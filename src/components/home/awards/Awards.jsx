import React from 'react'
import './awards.css'
import Heading from '../../common/Heading'
import { awards } from "../../data/Data"
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'

export default function Awards() {
  return (
    <>
      <section className="awards__background padding">
        <div className="container">
            <Heading 
              title="Over 1,24,000+ Happy Users Being With Us Still They Love Our Services"
              subtitle="Our Awards"
            />
            <div className="row mtop">
                {awards.map((val, index) => {
                    const { ref, inView } = useInView({
                      triggerOnce: true,
                      threshold: 0.2,
                    });

                    // Raqamni animatsiya qilish
                    const props = useSpring({
                      to: { number: inView ? val.num : 0 },
                      from: { number: 0 },
                      delay: index * 300,
                      config: { duration: 1000 },
                    });

                    return (
                        <div className="col-lg-3 col-6 text-center awards" key={index} ref={ref}>
                          <div className="awards__icon">
                              <span>{val.icon}</span>
                          </div>
                          {/* Raqamni yaxlitlash va formatlash */}
                          <animated.h1>
                            {props.number.to(n => Math.floor(n))}
                          </animated.h1>
                          <animated.p style={props}>{val.name}</animated.p>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>
    </>
  )
}
