import React from 'react'
import img from '../images/room.jpg'
import Back from '../back/Back'
import Footer from '../home/footer/Footer';
import './contact.css'
export default function Contact() {
  return (
    <div>
      <section className="about">
        <Back  name='Contact Us' title='Get Help & Friendly Subbort' cover={img}/>
        <section className="contact mt-5 mb-5">
        <div className="container">
          <form action="" className="contact__form border p-4  shadow">
            <h5 className='contact-span'>Fillup the from</h5>
            <div className="d-flex">
              <input type="text"placeholder='Name'className='border ' name="" id="" />
              <input type="text"placeholder='Email'className='border ' name="" id="" />
            </div>
            <input type="text"placeholder='Submit'className='border ' name="" id="" />
            <textarea name=""className='border' id=""></textarea>
            <button className='btn1 '>Submit Request</button>
          </form>
        </div>
        </section>
        <Footer />
      </section>
    </div>
  )
}
