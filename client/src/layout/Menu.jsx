import React from 'react'
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom'
import './menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export const Menu = ({ isOpen, closeMenu }) => {
    return ReactDOM.createPortal(
        <div className={`menu-conatiner ${isOpen ? 'open' : ''}`}>
            <div className="close" onClick={() => closeMenu()}>
                <FontAwesomeIcon icon={faClose} />
            </div>
            <div className="container d-flex justify-content-center align-items-center h-100 w-100 flex-column gap-4">
                <p className='display-6 head'>Modules</p>

                <div className="row">

                </div>

                <ul className="navbar-nav text-center">
                    <li className="nav-item">
                        <NavLink to={`/`} className="nav-link" onClick={() => closeMenu()}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/resell`} className="nav-link" onClick={() => closeMenu()}>Resell</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/incoming`} className="nav-link" onClick={() => closeMenu()}>Incoming features</NavLink>
                    </li>
                </ul>
            </div>
        </div>,
        document.getElementById('menu')
    )
}
