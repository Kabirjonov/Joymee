import React from 'react'
import { useNavigate } from 'react-router-dom'
import './hero.css'
import Heading from '../../common/Heading'
import Search from './Search'
import { useLanguage } from '../../changeLanguage/changer'
export default function Hero() {
  const navigate = useNavigate()
  const {tranlation, language}=useLanguage()
  return (
    <>
      <section className='hero' style={{height:'100vh'}}>
        <div className='container'>
           <Heading title={tranlation[language].welcome} subtitle={tranlation[language].contact}/> 
          <div className="" onClick={()=>navigate('/blog')}>
          <Search/>
          </div>
        </div>
      </section>
    </>
  )
}
