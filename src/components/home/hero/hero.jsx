import React from "react";
import { Carousel } from "react-bootstrap";
import { HeroInfo } from "../../../constatnts/data";
import "bootstrap/dist/css/bootstrap.min.css";

function Hero() {
  return (
    <div className="hero-section position-relative text-white">
      <Carousel fade interval={5000} className="w-100">
        {HeroInfo.map((item, index) => (
          <Carousel.Item key={index}>
            <div className={`d-flex flex-column justify-content-center align-items-center vh-100 text-center p-5 ${item.classNameDiv}`} style={{
              background: `linear-gradient(rgba(255,255,255,0.2), rgba(0,0,0,0.6)), url(${item.image}) center/cover`,
            }}>
              <h1 className="display-4 fw-bold mb-3">{item.title}</h1>
              <p className="lead w-75 mx-auto">{item.text}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Hero;
