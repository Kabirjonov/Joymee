import React from 'react'

export default function Back({name,title,cover}) {
  return (
    <div className='bg-darkblue d-flex  align-items-center ' style={{height:'18rem'}}>
      <div className="container">
        <span className='text-secondary'>{name}</span>
        <h1 className='text-light'>{title}</h1>
      </div>
    </div>
  )
}
