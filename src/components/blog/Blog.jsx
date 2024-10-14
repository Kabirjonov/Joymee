import React from 'react'
import img from '../images/room.jpg'
import Back from '../back/Back'
import Footer from '../home/footer/Footer';
import Blog1 from '../home/recent/Recent'
export default function Blog() {
  return (
    <div>
      <section className="about">
        <Back  name='Blog' title='Blog Grid - Our Blogs' cover={img}/>
        <Blog1/>
        <Footer />
      </section>
    </div>
  )
}
