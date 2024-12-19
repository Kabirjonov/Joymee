import React from 'react'
import { useNavigate } from 'react-router-dom'
import './hero.css'
import Heading from '../../common/Heading'
import Search from './Search'
export default function Hero() {
  const navigate = useNavigate()
  return (
    <>
      <section className='hero' style={{height:'100vh'}}>
        <div className='container'>
          <Heading title="search your next home" subtitle="Lorem ipsum dolor sit amet laudantium optio quae repudiandae accusamus. Hic?"/>
          <div className="" onClick={()=>navigate('/blog')}>
          <Search/>

          </div>
        </div>
      </section>
    </>
  )
}
