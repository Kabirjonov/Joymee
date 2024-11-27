import React, { useState } from 'react';
import img from '../images/room.jpg';
import Back from '../back/Back';
import Footer from '../home/footer/Footer';
import './contact.css';
import { Row, Col } from 'reactstrap';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';

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
    // console.log('Form Submitted:', formData);
    const {name,lastname,email,message}= formData
    axios.post('http://localhost:3001/api/emailSender',{name,lastname,email,message})
    .then((res) => {
      if (res.data.success) {
          setFormData({
              name: '',
              lastname: '',
              email: '',
              message: '',
          });
          toast.success(res.data.message);
      } else {
          toast.error(res.data.message || 'Something went wrong!');
      }
  })
  .catch((err) => {
      toast.error(err.response?.data?.message || 'Server error. Please try later.');
  });
  };

  return (
    <>
      <section className="about">
      <ToastContainer />
        <Back name="Contact Us" title="Get Help & Friendly Support" cover={img} />
        <section className="contact mt-5 mb-5">
          <div className="container">
            <form
              className="contact__form border p-4 shadow"
              onSubmit={handleSubmit}
            >
              <h5 className="contact-span">Fill up the form</h5>
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
          </div>
        </section>
        <Footer />
      </section>
    </>
  );
}
