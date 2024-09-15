import React from 'react'
import Hero from './Hero/Hero'
import Featured from './Featured/Featured'
import Recent from './recent/Recent'
import Awards from './awards/Awards'
import Teams from './teams/Teams'
import Footer from './footer/Footer'
export default function Home() {
  return (
    <>
      <Hero/>
      <Featured/>
      <Recent/>
      <Awards/>
      <Teams/>
      <Footer />
    </>
  )
}
