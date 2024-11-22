import React from 'react'
import img from '../images/room.jpg'
import Back from '../back/Back'
import Footer from '../home/footer/Footer';
import Header from '../common/Heading';
import ImgRight from '../images/room.jpg'
import './about.css'
export default function About() {
  return (
    <div>
      <section className="about">
        <Back  name='About Us' title='About Us - Who We Are?' cover={img}/>
        <div className="container mt-4 mb-4 ">
          <div className="row">
            <div className="col-sm-12 col-md-6 ">
            <Header title='Our History' subtitle='Lorem ipsum, dolor sit amet consectetur adipisicing.'/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident fugiat aliquam vel at aspernatur ipsa unde beatae sapiente architecto accusantium?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident fugiat aliquam vel at aspernatur ipsa unde beatae sapiente architecto accusantium?</p>
            <div>
            <button className='Button_02'>More About Us</button>

            </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <img src={ImgRight} className='For-about__rightimg w-100 h-100' alt="" />
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  )
}
