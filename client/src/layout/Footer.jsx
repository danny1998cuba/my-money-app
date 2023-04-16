import React from 'react'

export const Footer = () => {
    let year = new Date().getFullYear()
    return (
        <small className='mt-3'>
            <p>
                <b>My Money App</b> by <a href="https://github.com/danny1998cuba" className='text-decoration-none text-secondary'>d98c_sw</a> - {year}
            </p>
        </small>
    )
}
