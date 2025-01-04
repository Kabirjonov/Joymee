import React, { useRef, useState } from 'react';
import img from '../images/room.jpg';
import Back from '../back/Back';
import Footer from '../home/footer/Footer';
import './contact.css';
import { Row, Col } from 'reactstrap';
import emailjs from 'emailjs-com'; // Import EmailJS
import { toast, ToastContainer } from 'react-toastify'; // Toast notifications
import Basic from '../OtherPageStyle/basic';
import Heading from '../common/Heading';

export default function Contact() {
  const [isLoading,setIsLoading]=useState(false)
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    message: '',
  });

  const formRef = useRef(); // Create a ref for the form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID, // Correct variable for service ID
        process.env.REACT_APP_EMAIL_TEMPLATE_ID, // Correct variable for template ID
        formRef.current,
        process.env.REACT_APP_EMAIL_USER_ID // Correct variable for user ID
      )
      .then(
        (result) => {
          toast.success('Message sent successfully!');
          setFormData({ name: '', lastname: '', email: '', message: '' }); // Clear form
          setIsLoading(false)
        },
        (error) => {
          console.error('Error sending email:', error.text);
          toast.error('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <>
      <ToastContainer />
      <Basic name="Contact Us" title="Get Help & Friendly Support" cover={img}>
        <form ref={formRef} onSubmit={handleSubmit} className='px-2'>
          {/* <h5 className="contact-span text-center mb-3">Fill up the form</h5> */}
            <Heading title="Fill up the form" SpecialClass="w-100 text-center" size="w-75 m-auto"/>
          <div className='row mb-2 mt-3'>
            <div className="col-md-6 form-group p-1">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                placeholder="Name"
                className="form-control my-1"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 form-group p-1">
              <label htmlFor="lastname">Lastname:</label>
              <input
                type="text"
                placeholder="Lastname"
                className="form-control my-1"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 form-group p-1">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control my-1"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 form-group p-1">
              <label htmlFor="message">Message:</label>
              <textarea
                name="message"
                placeholder="Write your message here"
                className="form-control my-1"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
          </div>

          <button className="btn btn-warning"disabled={isLoading}>{isLoading?"Sending...":"Send"}</button>
        </form>
      </Basic>
    </>
  );
}
