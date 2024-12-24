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
          <Heading title="search your next home" subtitle="Lorem ipsum dolor sit amet laudantium optio quae repudiandae accusamus. Hic?"/> 
{/*          bu sinov uchun home hero ichida yozilgan tili ozgarishi edi functionalnis ishladi lekin butun saxifani uch tilga ogirib chiqishga erindim
           <Heading title={tranlation[language].welcome} subtitle={tranlation[language].contact}/>  */}
          <h1></h1>
          <div className="" onClick={()=>navigate('/blog')}>
          <Search/>
          </div>
        </div>
      </section>
    </>
  )
}
