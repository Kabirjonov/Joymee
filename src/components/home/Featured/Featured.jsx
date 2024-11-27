import React from 'react'
import FeaturedCard from './FeaturedCard'
import './featured.css'
import Heading from '../../common/Heading'
export default function Featured() {
  return (
    <>
      <section className="padding background">
        <div className="container">
          <Heading title="Featured Property Types"SpecialClass="w-100 text-center" size="w-75 m-auto" subtitle="Lorem ipsum dolor sit amet laudantium optio quae repudiandae accusamus."/>
          <FeaturedCard/>
        </div>
      </section>
    </>
  )
}
