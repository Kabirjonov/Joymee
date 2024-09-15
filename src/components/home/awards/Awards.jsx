import React from 'react'
import './awards.css'
import Heading from '../../common/Heading'
import {awards} from "../../data/Data"
export default function Awards() {
  return (
    <>
      <section className="awards__background padding">
        <div className="container">
            <Heading title="Over 1,24,000+ Happy User Bieng With Us Still They Love Our Services"
            subtitle="Our Awards"/>
            <div className="row mtop">
                {awards.map((val,index)=>{
                    return(
                        <div className="col text-center awards">
                        <div className="awards__icon">
                            <span>{val.icon}</span>
                        </div>
                        <h1>{val.num}</h1>
                        <p>{val.name}</p>
                    </div>
                    )
                   
                })}
            </div>
        </div>
      </section>
    </>
  )
}
