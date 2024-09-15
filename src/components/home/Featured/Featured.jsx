import React from 'react'
import FeaturedCard from './FeaturedCard'
import './featured.css'
import Heading from '../../common/Heading'
export default function Featured() {
  return (
    <>
      <section className="padding background">
        <div className="container">
          <Heading title="Featured Property Types" subtitle="Lorem ipsum dolor sit amet laudantium optio quae repudiandae accusamus."/>
          <FeaturedCard/>
        </div>
      </section>
    </>
  )
}
