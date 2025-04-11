import React from 'react'

function Head({subtitle='',title,text,className,classNameDiv,classNameP}) {
    return (
        <div className={`w-50 mx-auto mb-4 head ${classNameDiv}`}>
            <h4 className={`${className}`}>{subtitle}</h4>
            <h1>{title}</h1>
            <p className={`text-secondary sm-none ${classNameP}`}>{text}</p>
        </div>
    )
}

export default Head
