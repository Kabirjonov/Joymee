import React from 'react'
import Heading from '../../common/Heading'
import RecentCard from './RecentCard'
import './recent.css'
export default function Recent() {
  return (
    <>
     <div className="recent padding">
        <div className="container">
            <Heading title="Recent Property Listed" subtitle="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam."/>       
            <RecentCard />
        </div>
     </div> 
    </>
  )
}
