import React from 'react'
import './header/header.css'
export default function Heading({title,subtitle}) {
  return (
    <>
      <div className="heading">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </>
  )
}
