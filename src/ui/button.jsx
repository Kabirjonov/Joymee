import React from 'react'

function Button({ children, onClick, className = 'logo_color_bg', disabled = false }) {
    return (
        <button
        className={`btn fw-bold my-auto ${className}`}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
    )
}

export default Button
