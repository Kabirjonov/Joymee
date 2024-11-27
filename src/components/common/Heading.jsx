import React from 'react'
import './header/header.css'
export default function Heading({title,subtitle,SpecialClass,size}) {
  return (
    <>
      <div className={`heading ${SpecialClass} `}>
        <h1>{title}</h1>
        <p className={`${size}`}>{subtitle}</p>
      </div>
    </>
  )
}
