import React, { useState } from 'react';
import img from '../images/room.jpg';
import Back from '../back/Back';
import Footer from '../home/footer/Footer';
import './contact.css';
import { Row, Col } from 'reactstrap';
import axios from 'axios'
import { toast } from 'react-toastify';
import Basic from '../OtherPageStyle/basic';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    message: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastname, email, message } = formData
    console.log(formData)
  };

  return (
    <>
      <Basic name="Contact Us" title="Get Help & Friendly Support" cover={img}>
        <form
          onSubmit={handleSubmit}
        >
          <h5 className="contact-span text-center mb-3">Fill up the form</h5>
          <Row>
            <Col md={6}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                placeholder="Name"
                className="border"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6}>
              <label htmlFor="lastname">Lastname:</label>
              <input
                type="text"
                placeholder="Lastname"
                className="border"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            className="border"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            placeholder="Write your message here"
            className="border"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
          <button className="btn1">Submit Request</button>
        </form>
      </Basic>

    </>
  );
}
