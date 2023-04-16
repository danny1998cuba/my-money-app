import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export const ModuleLayout = ({ menus }) => {
    return (
        <>
            {
                menus && <nav className='module-nav w-100 d-flex justify-content-center justify-content-sm-start align-items-center'>
                    <ul className='list-unstyled d-flex gap-3 flex-row flex-wrap'>
                        {menus.map(menu => (
                            <li>
                                <NavLink key={menu.key} to={`${menu.href}`}
                                    className='text-decoration-none text-dark' end={menu.isEnd}>
                                    {menu.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            }
            <Outlet />
        </>
    )
}
