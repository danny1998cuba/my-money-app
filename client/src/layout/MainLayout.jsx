import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Footer } from './Footer'
import { Menu } from './Menu'
import { Outlet } from 'react-router-dom'

export const MainLayout = ({ title = "Title" }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="menu my-4" onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
            </div>

            <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)} />

            <div className="main-container">
                <div className="container px-4">
                    <p className="display-6">{title}</p>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}
